from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

# Import inquiry models and email service
from models.inquiry import InquiryCreate, Inquiry, InquiryResponse
from services.email_service import get_email_service


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env', override=False)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field and only fetch needed fields
    # Limited to 100 most recent entries for performance
    status_checks = await db.status_checks.find(
        {}, 
        {"_id": 0, "id": 1, "client_name": 1, "timestamp": 1}
    ).sort([('timestamp', -1)]).limit(100).to_list(100)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form Endpoint
@api_router.post("/contact", response_model=InquiryResponse)
async def submit_contact_form(inquiry_input: InquiryCreate):
    """
    Submit a contact form inquiry
    - Stores inquiry in MongoDB
    - Sends email notification
    """
    try:
        # Create inquiry object
        inquiry = Inquiry(
            name=inquiry_input.name,
            email=inquiry_input.email,
            phone=inquiry_input.phone,
            message=inquiry_input.message
        )
        
        # Store in database
        inquiry_dict = inquiry.model_dump()
        inquiry_dict['created_at'] = inquiry_dict['created_at'].isoformat()
        await db.inquiries.insert_one(inquiry_dict)
        
        logger.info(f"New inquiry stored: {inquiry.id} from {inquiry.name}")
        
        # Send email notification (non-blocking, don't fail if email fails)
        try:
            email_service = get_email_service()
            email_sent = email_service.send_inquiry_notification({
                'name': inquiry.name,
                'email': inquiry.email,
                'phone': inquiry.phone,
                'message': inquiry.message
            })
            
            if email_sent:
                logger.info(f"Email notification sent for inquiry {inquiry.id}")
            else:
                logger.warning(f"Email notification failed for inquiry {inquiry.id}")
        except Exception as email_error:
            logger.error(f"Email service error: {str(email_error)}")
        
        return InquiryResponse(
            success=True,
            message="Thank you for your inquiry! We'll get back to you soon.",
            inquiry_id=inquiry.id
        )
        
    except Exception as e:
        logger.error(f"Error processing inquiry: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to submit inquiry. Please try again or contact us directly."
        )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()