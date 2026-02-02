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
- ✅ Contact information cards (Phone: 9810721166, Email, Location)
- ✅ Business hours section
- ✅ Contact form (Name, Email, Phone, Message)
- ✅ Form submission with success message (frontend mock)

---

## Components Created

### Layout Components
- **Navbar** - Fixed navigation with scroll effect, responsive mobile menu
- **Footer** - Brand info, quick links, contact details

### Data Structure
- **mockProducts.js** - All 51 products with:
  - id, name, category, price, image, description
  - Helper functions: getProductsByCategory(), getProductById()

---

## Product Categories & Count
1. **Spice Powders** - 8 products
2. **Whole Spices** - 7 products
3. **Teas** - 2 products
4. **Flours** - 2 products
5. **Dried Vegetables** - 3 products
6. **Beans & Legumes** - 3 products
7. **Nuts & Dry Fruits** - 4 products
8. **Premium Items** - 3 products (including Saffron at ₹2499)
9. **Seeds & Herbs** - 14 products
10. **Specialty Items** - 5 products

---

## Technical Implementation

### Frontend Stack
- React 19.0.0
- React Router DOM for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Custom fonts: Playfair Display, Inter

### Key Features
- Smooth scroll behavior
- Intersection Observer for scroll animations
- Parallax effect using scroll position
- Responsive design (mobile, tablet, desktop)
- Custom scrollbar styling
- Hover states and transitions

### Mock Data
- All product data stored in `/app/frontend/src/data/mockProducts.js`
- Contact form submission is mocked (frontend only)
- No backend integration yet

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
- [x] Contact form UI with mock submission

---

## Contact Details
- **Phone:** 9810721166
- **Email:** info@kashmiricorner.com (placeholder)
- **Location:** Kashmir, India (placeholder)

---

## Next Action Items

### Priority: P0 (Must Have)
- [ ] Backend development for contact form
- [ ] Database setup for storing inquiries
- [ ] Email notification system for new inquiries
- [ ] Admin panel to manage inquiries

### Priority: P1 (Should Have)
- [ ] WhatsApp integration for direct contact
- [ ] Real pricing updates (if available)
- [ ] Product availability status
- [ ] Image optimization and lazy loading
- [ ] SEO optimization (meta tags, sitemap)

### Priority: P2 (Nice to Have)
- [ ] Customer testimonials section
- [ ] Blog/articles about Kashmiri products
- [ ] Newsletter subscription
- [ ] Product reviews and ratings
- [ ] Image gallery for each product
- [ ] FAQ section
- [ ] About Us page with team details

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

## Success Metrics (Future)
- Number of inquiries received per month
- Conversion rate from inquiry to order
- Popular product categories
- Average response time to inquiries
- Customer satisfaction ratings

---

## Design Notes
- No dark/vibrant gradients on buttons
- Premium, earthy color palette maintained throughout
- Ample white space for luxury feel
- Professional product photography style (white backgrounds)
- Smooth transitions on all interactive elements
- Focus on emotional impact through visual design
