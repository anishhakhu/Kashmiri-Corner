import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv("SMTP_HOST")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_user = os.getenv("SMTP_USER")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.from_email = os.getenv("SMTP_FROM_EMAIL")
        self.notification_email = os.getenv("NOTIFICATION_EMAIL")
        
        logger.info(f"EmailService initialized: host={self.smtp_host}, port={self.smtp_port}")

    def send_inquiry_notification(self, inquiry_data: dict) -> bool:
        """Send email notification for new inquiry"""
        server = None
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"New Inquiry from {inquiry_data['name']} - Kashmiri Corner"
            msg['From'] = self.from_email
            msg['To'] = self.notification_email

            # Create HTML email body
            html_body = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #B8860B 0%, #DAA520 100%); 
                              color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
                    .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }}
                    .field {{ margin-bottom: 20px; }}
                    .label {{ font-weight: bold; color: #B8860B; display: block; margin-bottom: 5px; }}
                    .value {{ background: white; padding: 12px; border-radius: 6px; 
                            border-left: 3px solid #B8860B; }}
                    .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 12px; }}
                    .timestamp {{ color: #888; font-size: 14px; margin-top: 10px; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0;">🔔 New Customer Inquiry</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">Kashmiri Corner</p>
                    </div>
                    <div class="content">
                        <div class="field">
                            <span class="label">Customer Name:</span>
                            <div class="value">{inquiry_data['name']}</div>
                        </div>
                        <div class="field">
                            <span class="label">Email Address:</span>
                            <div class="value">{inquiry_data['email']}</div>
                        </div>
                        <div class="field">
                            <span class="label">Phone Number:</span>
                            <div class="value">{inquiry_data['phone']}</div>
                        </div>
                        <div class="field">
                            <span class="label">Message:</span>
                            <div class="value">{inquiry_data['message']}</div>
                        </div>
                        <div class="timestamp">
                            Received: {datetime.utcnow().strftime('%B %d, %Y at %I:%M %p UTC')}
                        </div>
                    </div>
                    <div class="footer">
                        <p>This is an automated notification from Kashmiri Corner inquiry system.</p>
                        <p>Please respond to the customer at the provided email or phone number.</p>
                    </div>
                </div>
            </body>
            </html>
            """

            # Plain text fallback
            text_body = f"""
            New Customer Inquiry - Kashmiri Corner
            
            Customer Name: {inquiry_data['name']}
            Email: {inquiry_data['email']}
            Phone: {inquiry_data['phone']}
            
            Message:
            {inquiry_data['message']}
            
            Received: {datetime.utcnow().strftime('%B %d, %Y at %I:%M %p UTC')}
            """

            # Attach both parts
            part1 = MIMEText(text_body, 'plain')
            part2 = MIMEText(html_body, 'html')
            msg.attach(part1)
            msg.attach(part2)

            # Create SMTP connection and send email  
            logger.info(f"Connecting to SMTP: {self.smtp_host}:{self.smtp_port}")
            server = smtplib.SMTP(self.smtp_host, self.smtp_port, local_hostname='localhost')
            logger.info("✓ SMTP Connected")
            server.ehlo()
            logger.info("✓ EHLO sent")
            server.starttls()
            logger.info("✓ TLS started")
            server.ehlo()
            logger.info("✓ Second EHLO sent")
            server.login(self.smtp_user, self.smtp_password)
            logger.info("✓ Logged in")
            server.sendmail(self.from_email, [self.notification_email], msg.as_string())
            server.quit()
            logger.info(f"✓✓ Email sent successfully to {self.notification_email} for inquiry from {inquiry_data['name']}")
            return True

        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            logger.error(f"Error type: {type(e).__name__}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            return False
        finally:
            if server:
                try:
                    server.quit()
                except:
                    pass


# Function to get email service instance (created after .env is loaded)
def get_email_service():
    return EmailService()
