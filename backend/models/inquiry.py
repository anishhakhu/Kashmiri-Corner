from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import datetime
from typing import Optional
import uuid


class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    message: str = Field(..., min_length=10, max_length=1000)


class Inquiry(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "9876543210",
                "message": "I'm interested in Kashmiri saffron. Please let me know about availability.",
            }
        }
    )
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, read, responded


class InquiryResponse(BaseModel):
    success: bool
    message: str
    inquiry_id: Optional[str] = None
