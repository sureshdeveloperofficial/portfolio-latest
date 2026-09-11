# 🍱 Premium Mess — Enterprise-Grade Meal Subscription & Kitchen ERP Platform

> **Full-Stack SaaS Case Study & Portfolio Master Document**  
> *Engineered by Suresh | Production-Ready Next.js 16, TypeScript, PostgreSQL, Prisma & Tailwind CSS*

---

## 📌 Executive Summary

**Premium Mess** is a modern, high-performance subscription web platform and kitchen operations management system designed for meal prep companies, corporate cafeterias, and daily tiffin/mess catering services.

Traditional tiffin services suffer from:
- Manual order coordination over WhatsApp and phone calls
- Messy paper notebooks leading to missed deliveries and food waste
- Manual calculation of off-days, Sunday feasts, and vacation pauses
- Payment reconciliation delays and cash leakage

**Premium Mess** automates the entire lifecycle: from multi-tier meal plan selection and custom daily dish scheduling, to multi-location delivery routing (e.g., lunch delivered to office, dinner delivered to apartment), automated invoice generation via headless Chromium, and an administrative control panel with real-time operational analytics.

---

## 🎯 Why This Product? (The Problem & Value Proposition)

### 1. The Industry Problem
In urban hubs with high working-professional populations (such as Dubai, Bangalore, Mumbai, or London), thousands of professionals and students rely on daily meal subscriptions ("mess" or "tiffin" services) for fresh, home-cooked food.

However, the operating model of 95% of tiffin providers is broken:
- **Customer Frustration**: Customers cannot pick what dish they eat on Tuesday vs. Thursday; they cannot easily pause deliveries when traveling; and they often need lunch at the office and dinner at their apartment.
- **Operator Burnout**: Mess owners spend 3–4 hours every evening calculating who wants meals tomorrow, sorting handwritten addresses, and matching screenshots of bank transfers.
- **Revenue Leakage**: Missed billing for weekend feasts, untracked cash-on-delivery payments, and inability to scale past 50–100 subscribers without chaos.

### 2. The Solution & Business Impact
| Dimension | Traditional Mess Operations | With Premium Mess Platform |
| :--- | :--- | :--- |
| **Order Placement** | WhatsApp messages & phone calls | Interactive self-serve web portal with live menu previews |
| **Menu Customization** | Fixed static menu with no choice | Day-by-day dish personalization across Breakfast, Lunch & Dinner |
| **Dual Delivery Addresses** | Mixed up delivery notes | Native split-delivery routing (Brunch/Lunch at desk, Dinner at home) |
| **Weekend Logic** | Manual counting of Sundays | Automatic dynamic calculation of 26 workdays vs. Sunday feasts |
| **Payment Handling** | Cash envelopes or untracked UPI/IBAN screenshots | Integrated COD & Corporate IBAN transfer with instant receipt verification |
| **Invoicing & PDF** | Manual billing at month-end | Automated server-side PDF invoice rendering with QR verification |
| **Kitchen Planning** | Guesswork leading to 15–20% food waste | Exact dish count aggregation per meal slot generated automatically |

---

## 🏗️ System Architecture & Data Flow

### Architectural Topology

```mermaid
graph TD
    subgraph Client Layer
        Browser[Modern Web Browser / Mobile Responsive PWA]
        GuestUser[Prospective Subscriber]
        AuthUser[Active Subscriber]
        AdminUser[Kitchen Manager / Admin]
    end

    subgraph Presentation & Routing Layer [Next.js 16 App Router]
        SiteGroup["(site) Public Routes: /, /get-started, /menu, /plans, /checkout"]
        AuthGroup["(auth) NextAuth Session & Credentials Provider"]
        AdminGroup["(admin) Protected Admin Control Center"]
        InvoiceGroup["/invoice & /invoice/print Dedicated Render Engine"]
    end

    subgraph Application & Business Logic
        OrderEngine[Subscription & Dynamic Date Engine]
        ScheduleResolver[Daily Dish Matrix & Meal Slot Resolver]
        PDFEngine[Headless Puppeteer-Core Chromium Engine]
        Mailer[Nodemailer with Dynamic DB SMTP Config]
    end

    subgraph Data & Storage Layer
        PostgreSQL[(PostgreSQL via Supabase / Dedicated VPS)]
        PrismaORM[Prisma ORM Client & Migrations]
        DigitalOceanSpaces[DigitalOcean Spaces / AWS S3 Image Storage]
    end

    GuestUser --> SiteGroup
    AuthUser --> SiteGroup
    AuthUser --> AuthGroup
    AdminUser --> AdminGroup

    SiteGroup --> OrderEngine
    OrderEngine --> ScheduleResolver
    OrderEngine --> PrismaORM
    AdminGroup --> PrismaORM
    
    OrderEngine --> Mailer
    AdminGroup --> PDFEngine
    PDFEngine --> InvoiceGroup
    
    PrismaORM --> PostgreSQL
    SiteGroup --> DigitalOceanSpaces
```

---

## ⚙️ How It Works (End-to-End Workflow)

### 1. Customer Subscription Journey

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant UI as Next.js Web App
    participant Cache as TanStack Query
    participant API as Next.js API Routes
    participant DB as PostgreSQL (Prisma)
    participant SMTP as Dynamic Mailer

    Customer->>UI: Visits /get-started or /plans
    UI->>Cache: Fetch active Food Plans & Dishes
    Cache-->>UI: Return Plans (1-Time, 2-Time, 3-Time, Sunday Specials)
    Customer->>UI: Chooses Plan & Configures Days (Workdays / Sunday Add-on)
    Customer->>UI: Selects specific dishes for each day of week
    Customer->>UI: Enters Dual Delivery Addresses (Room/Desk, Lunch vs Dinner)
    Customer->>UI: Chooses Payment (Cash on Delivery or UAE IBAN Wire)
    Customer->>API: POST /api/orders (Payload with selectionsJson & activeDates)
    API->>DB: Upsert Customer & Create Order Record
    API->>SMTP: Trigger Order Confirmation Email with Invoice Breakdown
    API-->>UI: 201 Created & Redirects to /checkout/success
    Customer->>UI: Views Live Schedule & Downloads PDF Invoice in /my-orders
```

### 2. Multi-Tier Plan & Dynamic Date Calculation Engine
The platform includes an algorithmic date scheduling calculator:
- **Workday Calculation**: When a subscriber starts on *e.g., March 15th*, the system computes a rolling 30-day window. It automatically identifies workdays (Monday–Saturday) and groups Sundays.
- **Sunday Feast Toggle**: Customers can toggle whether their monthly subscription includes Sunday special biryani/feasts or workdays only. The price dynamically recalculates in real-time (`Math.round(activeDates.length * baseDailyRate)`).
- **Day-by-Day Dish Matrix**: The user configures their recurring weekly preferences:
  ```json
  {
    "Monday": { "lunch": "food_item_id_1", "dinner": "food_item_id_3" },
    "Tuesday": { "lunch": "food_item_id_2", "dinner": "food_item_id_4" },
    "Sunday": { "lunch": "sunday_feast_special_id" }
  }
  ```
- **Dual Delivery Routing**: Subscribers specify distinct delivery drop locations for brunch/lunch (e.g., Office Tower, Level 4, Desk 12) vs dinner (e.g., Apartment 402, Outside Door).

### 3. Customer Self-Service Portal (`/my-orders`)
- **Daily Meal Manifest**: Subscribers can see exactly what dish is scheduled for today and upcoming dates.
- **Live Subscription Progress**: Tracks total days active vs. days served (`activeDates` vs `servedDates`).
- **One-Click Invoice PDF Download**: Subscribers can generate their official tax invoice receipt on demand.

### 4. Admin Operations & Kitchen ERP (`/admin`)
- **Real-Time Kitchen Metrics**: Total active subscribers, today's meal production count by category, and monthly revenue analytics.
- **Menu & Plan Builder**: Create recurring subscription plans with customized serving frequencies (1, 2, or 3 meals/day), available days, and default meal schedules.
- **Dynamic System Settings**: Change company name, currency (AED, USD, INR), VAT percentage, UAE IBAN account details, and WhatsApp support hotline dynamically without code redeployment.
- **Dynamic SMTP Configuration**: The mailer pulls credentials directly from the database (`prisma.setting`), allowing admins to rotate SMTP servers with zero downtime.

---

## 💻 Tech Stack & Architectural Highlights

| Layer | Technology | Rationale & Enterprise Value |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server-Side Rendering (SSR) for blazing SEO, Server Actions, Route Handlers, and optimal caching |
| **Language** | TypeScript | 100% type safety across API requests, Prisma database models, and UI state |
| **UI Styling** | Tailwind CSS v4 & Vanilla CSS | Zero runtime overhead, responsive micro-animations, consistent design tokens |
| **Animation** | Framer Motion & GSAP | Smooth layout transitions, slide-over modals, and tactile checkout feedback |
| **Data Fetching** | TanStack React Query v5 | Client-side cache deduplication, background revalidation, and instant optimistic updates |
| **Database & ORM** | PostgreSQL + Prisma ORM | Relational integrity, cascade deletions, migration versioning, and connection pooling |
| **Authentication** | NextAuth.js (v4) | JWT-based session management, secure cookie tokens, and role separation (Customer vs Admin) |
| **PDF Generation** | Puppeteer-Core + Sparticuz Chromium | Pixel-perfect A4 invoice rendering from dynamic HTML/CSS templates |
| **Cloud Storage** | AWS S3 / DigitalOcean Spaces | Scalable asset CDN for food item photography and payment receipts |
| **Email Service** | Nodemailer | Automated HTML transaction receipts with fallbacks and dynamic DB config |
| **Deployment** | Docker, Nginx, Linux VPS | Containerized reproducible builds with automated health checks |

---

## 🗄️ Database Schema Breakdown

```mermaid
erDiagram
    Admin {
        string id PK
        string email UK
        string password
    }

    Setting {
        string id PK
        string key UK
        string value
    }

    Category {
        string id PK
        string name UK
        boolean isActive
        datetime createdAt
    }

    FoodItem {
        string id PK
        string name
        string description
        float price
        float monthlyPrice
        string image
        string categoryId FK
        boolean isActive
    }

    MealType {
        string id PK
        string name UK
        string icon
        boolean isActive
    }

    FoodMenu {
        string id PK
        string name
        float price
        int days
        int servingCount
        string[] availableDays
        json scheduleJson
        string mealTypeId FK
        boolean isActive
    }

    Customer {
        string id PK
        string name
        string phone UK
        string email UK
        string whatsappNo
        string password
    }

    Order {
        string id PK
        string customerId FK
        float totalAmount
        string paymentMethod
        string paymentStatus
        string deliveryLocation
        string brunchLunchLocation
        string dinnerLocation
        string status
        json selectionsJson
        datetime startDate
        string[] activeDates
        string[] servedDates
        boolean includeSundays
        int sundaysCount
    }

    Category ||--o{ FoodItem : "categorizes"
    MealType ||--o{ FoodMenu : "classifies"
    FoodItem }o--o{ FoodMenu : "included_in"
    Customer ||--o{ Order : "places"
    FoodMenu }o--o{ Order : "contains"
```

---

## 💡 Complex Engineering Challenges & Solutions

### Challenge 1: Dynamic Date & Recurring Schedule Matrix
- **Problem**: Traditional e-commerce carts operate on static items with quantities. A mess subscription operates across **time**: 30 days, skipping specific days, handling weekday menus vs weekend feasts, and matching customer slot preferences (Lunch-only vs Lunch+Dinner).
- **Solution**: Engineered a reactive scheduling algorithm that generates a 30-day projection based on `startDate`. Each day is cross-referenced with the selected menu's `availableDays`. Sundays are isolated into standalone add-on objects. Active dates are stored as an ISO date string array (`activeDates: string[]`), allowing day-level kitchen tracking and pause/resume logic.

### Challenge 2: Headless Server-Side PDF Invoicing
- **Problem**: Client-side canvas libraries (`html2canvas`) often suffer from layout distortion, missing fonts, and poor print quality when generating PDF invoices.
- **Solution**: Built a dedicated Next.js route `/invoice/print/[id]` designed specifically for print media CSS (`@media print`). When an invoice is requested, Next.js launches an ephemeral `puppeteer-core` instance using `@sparticuz/chromium`, loads the print route, and outputs a crystal-clear, vectorized A4 PDF binary with custom branding, IBAN details, and line-item breakdowns.

### Challenge 3: Guest Checkout to Authenticated Session Bridging
- **Problem**: Forcing users to register before selecting dishes causes a 60%+ checkout drop-off rate.
- **Solution**: Implemented an unauthenticated flow where customers can browse, pick plans, and customize meals using local storage caching (`order_selection` and `checkout_form_data`). At the final step, NextAuth seamlessly authenticates or creates the customer profile, preserves the exact meal matrix, and immediately places the order without losing user state.

### Challenge 4: Zero-Downtime Dynamic Configuration
- **Problem**: Hardcoded environment variables require redeploying the production container whenever bank IBANs change, WhatsApp support numbers update, or SMTP credentials rotate.
- **Solution**: Implemented a dynamic `Setting` key-value table. Core application modules (such as the mailer and checkout wire transfer box) fetch live config from the database with graceful environment variable fallbacks.

---

## 💼 How to Showcase This Project in Your Portfolio

### 1. Portfolio Project Card (Quick Pitch)
- **Project Title**: **Premium Mess — Enterprise Meal Subscription & Kitchen ERP Platform**
- **Tagline**: Full-Stack Next.js 16 SaaS powering end-to-end meal prep subscriptions, custom weekday dish scheduling, dual-location delivery logistics, and automated billing.
- **Tech Stack Badges**: `Next.js 16` `TypeScript` `PostgreSQL` `Prisma` `Tailwind CSS` `Puppeteer` `NextAuth` `Docker`
- **Key Metric/Impact**: Reduced kitchen order processing time from 4 hours/day to automated real-time manifests; supports multi-location delivery routing and automated PDF invoicing.

### 2. Resume Bullet Points (STAR Method)
Use these high-impact bullet points on your CV/resume:

> - **Architected and developed a full-stack SaaS platform** for meal prep businesses using **Next.js 16, TypeScript, PostgreSQL, and Prisma**, supporting customizable 30-day recurring meal plans and Sunday feast add-ons.
> - **Engineered an algorithmic dish-scheduling matrix** allowing subscribers to customize daily meal selections across multiple slots (Breakfast/Lunch/Dinner) with real-time price calculation based on active service days.
> - **Implemented a dual-location delivery routing system** enabling customers to designate distinct drop points (e.g. workplace vs home residence) for split meal dispatches.
> - **Built an automated server-side PDF invoice engine** using **Puppeteer-Core & Chromium**, generating pixel-perfect tax invoices with QR verification and automated email dispatch via Nodemailer.
> - **Created a full administrative dashboard** featuring operational metrics, food catalog taxonomy, order fulfillment lifecycles, and zero-downtime dynamic settings management.
> - **Containerized the application using Docker and Docker Compose**, implementing Nginx reverse proxy configuration and digital asset storage with S3/DigitalOcean Spaces.

---

## 🎤 Technical Interview Talking Points & Q&A

### Q1: "Why did you choose Next.js 16 App Router over a separate React + Express backend?"
> *"I chose Next.js 16 App Router because this platform benefits immensely from hybrid rendering. The public landing pages, food menus, and plan showcases are rendered server-side for maximum SEO, fast First Contentful Paint (FCP), and optimal Core Web Vitals. At the same time, the API Route Handlers serve as a unified, type-safe backend running Prisma ORM, eliminating the overhead of maintaining two separate repositories while keeping deployment streamlined with a single Docker container."*

### Q2: "How do you handle data integrity for orders with complex schedules?"
> *"Instead of creating 30 separate relational rows for every day of a single monthly subscription, I utilized a hybrid schema approach. The core transactional entity is the `Order` model in PostgreSQL. Structural details like customer ID, payment status, and total amount are strictly relational. The flexible recurring dish choices are stored as structured JSON (`selectionsJson`), and the valid fulfillment dates are stored as an indexed string array (`activeDates: string[]`). This provides relational integrity for payments and customer records while maintaining blazing fast query performance without heavy 30-table joins."*

### Q3: "How is security handled for the administrative endpoints?"
> *"We implemented role-aware authentication using NextAuth. Customer sessions verify user ownership before displaying order history in `/my-orders`. Admin routes under `/(admin)/admin` are protected by route-level middleware and server-side session checks verifying the admin credentials against the `Admin` model with Bcrypt password hashing."*

---

## 🚀 Local Development & Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd mess-website

# 2. Install dependencies
npm install

# 3. Configure environment variables (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/mess_db"
NEXTAUTH_SECRET="your-secure-secret-key"
NEXTAUTH_URL="http://localhost:7691"

# 4. Generate Prisma Client and push schema
npx prisma generate
npx prisma db push

# 5. Run development server
npm run dev
```

Visit `http://localhost:7691` in your browser.

---

## 📄 License & Attribution
Designed and built with modern engineering standards by **Suresh**.  
*Available for code demonstration, enterprise licensing, and portfolio review.*
