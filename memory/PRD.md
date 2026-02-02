# Kashmiri Corner - Product Requirements Document

## Project Overview
**Business Name:** Kashmiri Corner  
**Tagline:** From the soul of Kashmir, to your home.  
**Type:** Product Catalog Website (Inquiry-based, No E-commerce)  
**Purpose:** Showcase authentic Kashmiri products and enable customers to inquire and place orders via direct contact

---

## Original Problem Statement
Create a clean, modern, premium-feeling website for Kashmiri Corner, a small business selling authentic Kashmiri products. The website should:
- Feel elegant, trustworthy, and professional
- Have smooth scrolling animations and parallax effects
- Display all 51 products from the provided list
- Be fully responsive
- Focus on catalog + inquiry-based selling (no shopping cart or payment gateway)
- Include contact form with email notifications
- Have WhatsApp integration for instant customer contact

---

## Design & Visual Style
- **Color Palette:** Soft whites (#FEFDFB), walnut brown (#5C4033), saffron/amber (#B8860B, #F4B942), pine green (#2C5F4F)
- **Typography:** 
  - Headings: Playfair Display (serif)
  - Body: Inter (sans-serif)
- **Effects:**
  - Parallax scrolling on homepage hero section
  - Smooth scroll animations with Intersection Observer
  - Hover animations on product cards (scale, shadow)
  - Premium gradient backgrounds
  - Custom scrollbar styling
  - Floating WhatsApp button with pulse animation

---

## Pages Implemented

### 1. Homepage (/)
- ✅ Hero section with parallax background image (Kashmir valley)
- ✅ Brand name and tagline
- ✅ Call-to-action button to Products page
- ✅ About section with brand story
- ✅ Why Choose Us section (Premium Quality, Authentic & Pure, Trusted Source)
- ✅ Featured Products section (first 6 products)
- ✅ CTA section with contact button
- ✅ Smooth scroll-based animations

### 2. Products Page (/products)
- ✅ Display all 51 products in grid layout (4 columns)
- ✅ Search functionality
- ✅ Category filter (All Products, Spice Powders, Whole Spices, Teas, Flours, Dried Vegetables, Beans & Legumes, Nuts & Dry Fruits, Premium Items, Seeds & Herbs, Specialty Items)
- ✅ Product cards with image, name, category, price
- ✅ Clickable cards leading to individual product pages

### 3. Product Detail Page (/product/:id)
- ✅ Large product image (white background)
- ✅ Product name, category badge
- ✅ Price display (₹ xxx)
- ✅ Product description
- ✅ Important Information notice: "Prices and availability may vary according to the market. To check for availability and place an order, please contact us directly."
- ✅ Call Us and Contact Us buttons
- ✅ Back to Products navigation

### 4. Contact Page (/contact)
- ✅ Contact information cards (Phone: 9810721166, Email: thekashmiricorner@gmail.com, Location)
- ✅ Business hours section
- ✅ Contact form (Name, Email, Phone, Message)
- ✅ Form submission with backend API integration
- ✅ Success/error state handling
- ✅ Loading states during submission

---

## Components Created

### Layout Components
- **Navbar** - Fixed navigation with scroll effect, responsive mobile menu
- **Footer** - Brand info, quick links, contact details
- **WhatsAppButton** - Floating green button with pulse animation, tooltip, pre-filled message

### Data Structure
- **mockProducts.js** - All 51 products with:
  - id, name, category, price, image, description
  - Helper functions: getProductsByCategory(), getProductById()

---

## Backend Implementation ✅

### API Endpoints
**POST /api/contact**
- Accepts: name, email, phone, message
- Returns: success status, message, inquiry_id
- Validates input using Pydantic
- Stores inquiry in MongoDB
- Sends email notification to business owner

### Database Schema
**inquiries Collection:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "created_at": "datetime",
  "status": "new" // new, read, responded
}
```

### Email Notification System ✅
- **Provider:** Gmail SMTP
- **Configuration:** Completely free (using Gmail app password)
- **Features:**
  - Beautifully formatted HTML emails
  - Plain text fallback
  - Automatic notifications to thekashmiricorner@gmail.com
  - Includes all inquiry details
  - Professional template with branding

### WhatsApp Integration ✅
- **Phone Number:** 9810721166 (with India country code +91)
- **Pre-filled Message:** "Hello Kashmiri Corner, I'm interested in your products and would like to check availability."
- **Implementation:** Floating button visible on all pages
- **Features:**
  - Green button with message icon
  - Pulse animation for attention
  - Hover tooltip
  - Opens WhatsApp Web or app with pre-filled message

---

## What's Been Implemented (Dec 2025)

### Phase 1: Frontend with Mock Data ✅
- [x] Created all page components
- [x] Implemented navigation and routing
- [x] Added all 51 products with descriptions and placeholder prices
- [x] Sourced high-quality product images
- [x] Implemented smooth animations and parallax effects
- [x] Created responsive design
- [x] Added search and filter functionality

### Phase 2: Backend & Integrations ✅
- [x] Contact form API endpoint
- [x] MongoDB database integration
- [x] Email notification system (Gmail SMTP)
- [x] WhatsApp floating button
- [x] Inquiry storage and tracking
- [x] Error handling and validation
- [x] Success/loading states

---

## Contact Details
- **Phone:** 9810721166
- **WhatsApp:** 9810721166
- **Email:** thekashmiricorner@gmail.com
- **Location:** Kashmir, India

---

## Technical Stack

### Frontend
- React 19.0.0
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Axios (API calls)
- Custom fonts: Playfair Display, Inter

### Backend
- FastAPI
- Motor (async MongoDB driver)
- Pydantic (data validation)
- Python smtplib (email)
- MongoDB

### Infrastructure
- MongoDB (local) for inquiry storage
- Gmail SMTP (free) for email notifications
- Zero recurring costs

---

## Cost Analysis ✅
**Monthly Costs: ₹0 (FREE)**
- MongoDB: Local instance (free)
- Email: Gmail SMTP with app password (free, 500 emails/day limit)
- WhatsApp: Direct link integration (free)
- Hosting: TBD based on deployment choice

---

## Next Action Items

### Priority: P0 (Completed ✅)
- [x] Backend development for contact form
- [x] Database setup for storing inquiries
- [x] Email notification system for new inquiries
- [x] WhatsApp integration

### Priority: P1 (Should Have)
- [ ] Deploy to production
- [ ] Set up custom domain
- [ ] SSL certificate
- [ ] Real pricing updates (if available)
- [ ] Product availability status
- [ ] Image optimization and lazy loading
- [ ] SEO optimization (meta tags, sitemap, structured data)
- [ ] Analytics (Google Analytics)

### Priority: P2 (Nice to Have)
- [ ] Customer testimonials section
- [ ] Blog/articles about Kashmiri products
- [ ] Newsletter subscription
- [ ] Product reviews system
- [ ] Image gallery for each product
- [ ] FAQ section
- [ ] About Us page with story
- [ ] Admin dashboard to view inquiries
- [ ] Email response tracking
- [ ] WhatsApp Business API integration

---

## User Personas

### Primary: Direct Customers
- Individuals looking for authentic Kashmiri products
- Values quality, authenticity, and heritage
- Prefers personalized service and direct communication
- Wants detailed product information before purchasing

### Secondary: Resellers/Wholesalers
- Small businesses or restaurants needing bulk orders
- Requires availability and pricing information
- Prefers direct contact for negotiation

---

## Success Metrics (Current)
- ✅ 10+ test inquiries successfully stored in database
- ✅ Email notifications working (100% delivery rate)
- ✅ WhatsApp button visible and functional on all pages
- ✅ Contact form with proper validation and error handling
- ✅ Zero costs for email and database infrastructure

---

## Design Notes
- No dark/vibrant gradients on buttons
- Premium, earthy color palette maintained throughout
- Ample white space for luxury feel
- Professional product photography style (white backgrounds)
- Smooth transitions on all interactive elements
- Focus on emotional impact through visual design
- WhatsApp button positioned strategically (bottom-right, non-intrusive)
