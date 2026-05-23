# Bangladeshi Homestay Travel Experience Design

Working project name: Bangladeshi Homestay Travel Experience

## 1. Project Overview

Bangladeshi Homestay is a travel platform for international guests who want to experience Bangladesh through real households instead of hotels. Guests stay with local host families for two weeks and take part in daily life, meals, local travel, and cultural activities.

The product should feel professional, warm, trustworthy, and culturally immersive. The website should not look like a generic travel booking marketplace. It should feel personal, image-led, and polished, with strong photography, clear booking flows, and a calm visual system.

### Unique Value Proposition

- Authentic cultural immersion with real Bangladeshi families
- Two-week household stay instead of a hotel stay
- All-inclusive experience except personal market purchases
- Personal connection with local hosts
- Guided cultural activities, meals, transport, and local tours included

## 2. Target Audience

The primary audience is international tourists, especially non-Bangladeshi travelers seeking authentic cultural experiences.

### Supported Languages

- English
- German / Deutsch
- French
- Italian

Translations will be handled manually. A full translation management system is not part of the initial scope.

## 3. Business Name Options

- Bengali HomeStay
- Deshi Dwelling
- Authentic Bangladesh
- Bengal Living
- HomeAway Bangladesh
- Cultural Stays in Bangladesh
- Bengali Bonds
- Nest Bangladesh

Until a final name is selected, use the working project name across the design system and placeholder content.

## 4. Visual Design Direction

The visual direction should be polished, editorial, and image-led. The design should use real photography to make the experience tangible: family meals, host homes, local markets, rivers, city arrival moments, cooking, crafts, music, and everyday household life.

Reference direction:

- AroundMe: immersive travel/nature presentation, clean destination browsing, strong image presence.
- Travel App Landing Page: calm section rhythm, clear app-like presentation, modern travel layout.

These references should inspire the composition and polish, not be copied directly.

### Layout Principles

- Use fewer card and box components.
- Prefer full-width sections, editorial splits, image bands, timelines, comparison tables, and clean inline feature groups.
- Use cards only when they serve a clear function, such as host listings, package comparison, review snippets, or admin dashboard summaries.
- Avoid stacking many boxed sections on top of each other.
- Make the first viewport strongly communicate the product: authentic Bangladeshi homestay travel, host families, and a bookable two-week cultural stay.
- Use imagery as a primary design asset, not as small decoration.
- Keep page layouts spacious but practical, with clear actions and scannable information.

### Typography

Use **Geist Sans** as the primary font for the public website, booking flow, and admin dashboard.

Typography should feel professional and modern:

- Large homepage headings should be confident but not oversized.
- Body text should be readable and calm.
- Package prices and booking details should use strong numeric hierarchy.
- Admin pages should use tighter, more utilitarian typography for dense information.
- Avoid generic system-font-only styling unless Geist Sans fails to load.

Recommended font stack:

```css
font-family: "Geist Sans", Geist, ui-sans-serif, system-ui, sans-serif;
```

### Icons

Use clean line icons, preferably Lucide-style icons, to improve scanning. Icons should support meaning, not decorate the page randomly.

Recommended icon areas:

- Airport pickup and dropoff
- Meals
- Local transport
- Host family
- Calendar availability
- Cultural activities
- Cooking classes
- Music sessions
- Crafts workshops
- Safety and support
- Language support
- Invoice-based payment
- Reviews
- Admin dashboard actions

### Image Use

Use images throughout the site to make the experience feel real and polished.

Image subjects should include:

- Bangladeshi family meals
- Host homes and guest rooms
- Local markets
- Cooking and food preparation
- Rural and river scenery
- City arrival or airport pickup
- Cultural workshops
- Music, crafts, and local tours
- Household daily life

Avoid generic stock images that could represent any country. Images should reveal Bangladesh, families, food, homes, and the human experience.

### Color Direction

Use a professional travel palette inspired by Bangladesh and natural materials:

- Deep ink for text and navigation
- Natural green for trust, landscape, and primary actions
- River blue for links and travel accents
- Warm clay for cultural highlights
- Rice-paper neutral backgrounds

Avoid generic purple SaaS gradients, heavy beige-only palettes, and overly decorative backgrounds.

## 5. Packages And Pricing

All packages are available with or without an international flight ticket. Prices are in Swiss Francs (CHF).

| Package | Without Flight Ticket | With Flight Ticket |
| --- | ---: | ---: |
| Standard | CHF 2,700 | CHF 4,200 |
| Premium | CHF 3,700 | CHF 5,200 |

### Standard Package

- Stay with the host family
- Basic cultural activities
- All meals included
- Local transportation
- Airport pickup and dropoff

### Premium Package

- Stay with the host family
- Extended cultural activities
- Cooking classes
- Music sessions
- Crafts workshops
- All meals included with more variety
- Local transportation
- Airport pickup and dropoff
- Additional local tours

### Included In All Packages

- Airport pickup and dropoff
- Breakfast, lunch, and dinner
- Local tours and sightseeing
- Cultural activities
- Local transportation

### Not Included

- Personal market purchases
- Souvenirs
- Personal expenses
- International flights, unless the guest selects a package with flight ticket

## 6. Payment Flow

Payment is processed by invoice and bank transfer. No third-party payment gateway is required.

Booking and payment flow:

1. Guest submits a booking.
2. System sends a booking confirmation email.
3. System generates a payment invoice.
4. The invoice is attached to the guest email.
5. Guest uses the invoice details to complete payment through their bank.
6. Guest pays by bank transfer.
7. Admin confirms the payment in the dashboard.

The design should make it clear that payment is not taken immediately by card. The guest should understand that they will receive payment details by email and complete payment by bank transfer.

## 7. Cancellation Policy

- 80% refund if cancelled within 7 days
- 50% refund if cancelled after 7 days

The cancellation page should explain whether the 7-day window is measured from the booking date or the travel start date.

## 8. Technical Specifications

| Area | Technology |
| --- | --- |
| Frontend | React / Next.js |
| Backend | Python FastAPI |
| Database | PostgreSQL or MongoDB |
| Payment | Invoice and bank transfer |
| Hosting | Hostinger |
| Authentication | JWT with FastAPI |
| Domain | To be purchased |

Possible domain names:

- bengalihomestay.com
- deshidwelling.com

## 9. Public Website Features

| Feature | Description |
| --- | --- |
| User Registration | Email and password signup with verification |
| User Login | Secure authentication |
| Profile Management | Update personal info and view booking history |
| Browse Hosts | View available host families |
| Host Profiles | Photos, bio, location, household details, amenities |
| Availability Calendar | Show available dates for each host |
| Booking System | Select dates, package, and book |
| Payment | Payment invoice sent by email after booking |
| Booking Confirmation | Email confirmation and payment invoice |
| Reviews | Guests may leave reviews after their stay |

## 10. Admin Features

| Feature | Description |
| --- | --- |
| Admin Dashboard | Overview of bookings, users, revenue, and payment status |
| Host Management | Add, edit, and delete host families |
| Booking Management | View and manage all bookings |
| User Management | View registered users |
| Content Management | Edit homepage, about, FAQ, and static content |

Admin design should be quieter and more utilitarian than the public site. Use clean tables, status labels, filters, date ranges, and compact action buttons with icons.

## 11. Static Pages

The website should include:

- Homepage
- About Us
- How It Works
- Host Families listing
- Individual Host Profile
- FAQ
- Contact
- Terms & Conditions
- Privacy Policy

## 12. Website Copy

Use the following copy as the initial website text. Do not include emojis in the UI copy.

### Homepage

#### Hero Section

Headline:

Live Bangladesh. Don't Just Visit It.

Subheadline:

Stay with a real Bangladeshi family, share their meals, join their daily life, and experience a culture that no hotel can offer.

Button:

Explore Packages

#### Intro Section

Headline:

A Different Kind of Travel

Bangladesh isn't just a destination. It's an experience that stays with you. Bengali Homestay connects you with warm, welcoming host families across Bangladesh for a 2-week immersion like no other. Wake up to home-cooked breakfasts, explore local markets, learn to cook traditional recipes, and build friendships that last a lifetime.

This isn't tourism. This is belonging.

#### Why Choose Us

Authentic Daily Life

Eat, cook, and live alongside your host family. Every meal, every conversation, every moment is genuinely Bangladeshi.

Everything Taken Care Of

From airport pickup to local transport, all meals and cultural activities, your stay is fully organised so you can simply enjoy.

Personal & Small-Scale

We work with a carefully selected host family to ensure an intimate, meaningful experience, not a crowded tour group.

#### Packages Section

Headline:

Choose Your Experience

Standard

A complete cultural immersion. Stay with your host family, join basic cultural activities, and enjoy all meals and local transport.

- Without flight: CHF 2,700
- With flight: CHF 4,200

Premium

Everything in Standard, plus extended cooking classes, music sessions, crafts workshops, and additional local tours. More time, more depth.

- Without flight: CHF 3,700
- With flight: CHF 5,200

Button:

Book Your Stay

#### How It Works

Headline:

Simple from Start to Finish

Choose your package

Pick Standard or Premium, with or without a flight ticket included.

Submit your booking

Fill out a short form and receive your confirmation and payment invoice by email within 24 hours.

Arrive & immerse yourself

Your host family will be at the airport to welcome you. From there, your Bengali adventure begins.

#### Closing CTA

Headline:

Ready to Experience Bangladesh Like a Local?

There are only a handful of spots available each season. Don't miss yours.

Button:

Book Now

### About Us Page

#### Hero

Headline:

We Believe Travel Should Feel Like Home

#### Our Story

Bengali Homestay was born from a simple belief: the most meaningful travel experiences don't happen in hotels. They happen around kitchen tables, in family courtyards, and on evening walks through local neighbourhoods.

We created this platform to bridge the gap between curious travellers and the rich, generous culture of Bangladesh. We want the world to see what we see: a country of extraordinary warmth, stunning landscapes, and people who open their homes and hearts with remarkable ease.

#### What We Do

We carefully match international guests with a host family in Bangladesh for a fully immersive 2-week stay. Everything is included: meals, local transport, cultural activities, and airport transfers, so you can focus entirely on the experience.

Whether you join a cooking class, visit a local bazaar, or simply sit and talk over chai, every moment is genuine. Nothing is staged. Everything is real.

#### Our Values

Authenticity

We don't create performances for tourists. We invite you into real homes and real lives.

Respect

We work closely with our host families to ensure the experience is enriching for both guests and hosts.

Connection

We believe cultural exchange makes the world better, one stay at a time.

### Homepage Design

The homepage should lead with an image-led hero that shows the actual experience: hosts, home life, meals, or a recognizable Bangladeshi setting. The headline should clearly communicate the offer, such as an authentic two-week stay with Bangladeshi families.

Recommended sections:

- Hero with primary booking CTA
- Short value proposition
- How the stay works
- Package comparison
- Featured host family
- Cultural activities preview
- Payment and booking explanation
- FAQ preview
- Final booking CTA

### Host Listing Design

Host listings may use cards because each host is a repeated item. Keep them clean and image-led. Each listing should show:

- Family photo
- City or area
- Short bio
- Languages spoken
- Available dates indicator
- Package availability
- View profile action

### Host Profile Design

Host profiles should feel personal and trustworthy. Use a large photo gallery, family introduction, household information, amenities, languages, available dates, and booking CTA.

Avoid turning every detail into a separate boxed card. Group information into readable sections with icons, dividers, and clear headings.

## 13. Host Family Information

Each host profile displays:

- Family photos
- Family bio or description
- Location, city, and area
- Household members information
- Home amenities
- Languages spoken by the family
- Available dates calendar
- Price per package

Initial host content:

- Start with 1 host family
- Future expansion can include multiple cities across Bangladesh
- Host group size is limited to 5-6 people

## 14. FAQ Topics

Initial FAQ content should answer:

- What is included in the price?
- How do I book?
- Can I choose my host family?
- What if I have dietary restrictions?
- Is it safe?
- What should I pack?
- How do I get from the airport?

FAQ layout should be simple and readable. Accordion rows are preferred over boxed FAQ cards.

## 15. Out Of Scope

The initial version does not include:

- Mobile app development
- Advanced SEO optimization
- Marketing or social media integration
- Multi-currency support
- Translation management system
- Blog section
- Responsive/mobile design
- Admin usage documentation

## 16. Third-Party Services

| Service | Purpose | Estimated Cost |
| --- | --- | --- |
| Domain (.com) | Website address | ~USD 10-15/year |
| Hostinger Hosting | Website hosting | ~USD 3-6/month |
| Invoice Payment | Payment invoice and bank transfer | No card gateway required |
| Email Service | Transactional emails | Free tier available |

## 17. Website Content Requirements

The website needs the following content and assets:

- Final brand name
- Logo and basic brand marks, if available
- Host family photos
- Host family bios and household details
- Host home and room photos
- Cultural activity photos
- About page content
- FAQ answers
- Terms & Conditions copy
- Privacy Policy copy

## 18. Design Implementation Notes

- Build the public site around strong photography, clear booking actions, and simple section flow.
- Keep boxed cards limited to repeated or comparable content.
- Use Geist Sans consistently across marketing pages, booking screens, and admin pages.
- Use icons for fast scanning, especially in package inclusions, host details, booking steps, and admin actions.
- Keep the payment explanation visible during booking so users understand the invoice and bank transfer flow.
- Make the host profile page feel personal and trustworthy with a large gallery, human bio, household details, amenities, languages, availability, and booking CTA.
