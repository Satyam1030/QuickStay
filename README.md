# 🏨 QuickStay — Premium Full-Stack Hotel Booking & Management Platform

<div align="center">

  ![QuickStay Banner](https://img.shields.io/badge/QuickStay-Hotel_Booking_Platform-blue?style=for-the-badge&logo=hotel)

  [![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Express.js v5](https://img.shields.io/badge/Express-v5.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Clerk Auth](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
  [![Stripe Payments](https://img.shields.io/badge/Stripe-Payments-6772E5?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
  [![Vercel Ready](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

  <p align="center">
    <b>A modern, high-performance web platform designed to seamlessly connect guests with luxury accommodations and empower hotel owners with full property management controls.</b>
  </p>

</div>

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
  - [👤 Guest Experience](#-guest-experience)
  - [🏢 Hotel Owner & Admin Panel](#-hotel-owner--admin-panel)
  - [⚡ Real-Time Webhooks & Infrastructure](#-real-time-webhooks--infrastructure)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [📁 Directory Structure](#-directory-structure)
- [📡 API Endpoint Reference](#-api-endpoint-reference)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Frontend Setup (`client`)](#2-frontend-setup-client)
  - [3. Backend Setup (`server`)](#3-backend-setup-server)
- [🔔 Third-Party Service Configurations](#-third-party-service-configurations)
  - [1. Clerk User Webhook Sync](#1-clerk-user-webhook-sync)
  - [2. Stripe Checkout & Webhook Sync](#2-stripe-checkout--webhook-sync)
  - [3. Cloudinary Image Media Storage](#3-cloudinary-image-media-storage)
  - [4. Nodemailer & Brevo SMTP Transactional Emails](#4-nodemailer--brevo-smtp-transactional-emails)
- [☁️ Vercel Deployment Guide](#️-vercel-deployment-guide)
- [📜 License](#-license)

---

## ✨ Key Features

### 👤 Guest Experience
- 🔍 **Dynamic Search & Multi-Filter Engine**: Filter accommodations instantly by city destination, room type (Single, Double, Luxury, Family Suite), and price ranges.
- 🌟 **Curated Collections & Offers**: Hand-picked featured destinations and exclusive discount promotions.
- 🛏️ **Rich Room Details & Real-Time Availability Check**: Interactive room pages with high-definition image carousels, amenity tags, price breakdowns, and check-in date validation.
- 💳 **Stripe Checkout Integration**: Secure online credit/debit card processing powered by Stripe Checkout.
- 📧 **Automated Transactional Emails**: Instant HTML booking confirmation emails sent automatically upon successful room reservation.
- 📅 **My Bookings Dashboard**: Comprehensive booking history overview showing payment statuses (Paid vs. Unpaid) and direct **Pay Now** links.
- 🔐 **SSO Authentication**: Frictionless login and sign-up experience using Clerk Auth.

### 🏢 Hotel Owner & Admin Panel
- 🏨 **Hotel Registration Workflow**: One-click owner onboarding to convert a user account into a registered hotel property owner.
- 📊 **Real-Time Revenue Analytics**: Owner dashboard displaying total hotel reservations, accumulated revenue metrics, and guest booking logs.
- ➕ **Multi-Image Room Listing Creator**: Multi-file upload interface supporting up to 4 high-resolution images uploaded directly to Cloudinary.
- 🛠️ **Live Availability Toggle**: Instant switch to enable/disable room availability across the entire platform.

### ⚡ Real-Time Webhooks & Infrastructure
- 🔄 **Svix Verified Clerk Webhook (`/api/clerk`)**: Real-time synchronization of user profiles (`user.created`, `user.updated`, `user.deleted`) between Clerk and MongoDB.
- 💳 **Stripe Event Webhook (`/api/stripe`)**: Automated payment verification listener updating booking statuses (`isPaid: true`) upon `payment_intent.succeeded`.
- 🌐 **Vercel Serverless Ready**: Native CORS handling, serverless temp file handling via Base64 Data URIs, and modular Express routes.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + Vite 6 | Lightning-fast SPA client with HMR and React Router v7 |
| **Styling & UI** | Tailwind CSS v4 + React Hot Toast | Modern utility-first CSS engine with sleek toast notifications |
| **Backend Runtime** | Node.js + Express v5 | Scalable REST API architecture with modular routers & middlewares |
| **Database** | MongoDB + Mongoose ODM | Document database for User, Hotel, Room, and Booking collections |
| **Authentication** | Clerk (`@clerk/react` & `@clerk/express`) | Secure User Management & Auth token middleware |
| **Media Storage** | Cloudinary v2 SDK | Base64 Data URI image upload engine for serverless environments |
| **Payments** | Stripe SDK | Stripe Checkout Sessions & Payment Intent Webhook construct |
| **Email Transport** | Nodemailer + Brevo / Gmail SMTP | HTML transactional email engine with fallback transport handling |
| **Webhooks** | Svix & Stripe Webhooks | Cryptographically signed webhook listeners |
| **Deployment** | Vercel | Dual serverless deployment (`client` SPA & `server` API) |

---

## 📁 Directory Structure

```
QuickStay/
├── client/                              # React 19 Frontend Application
│   ├── public/                          # Static public assets
│   ├── src/
│   │   ├── assets/                      # Icons, facility graphics, and visual assets
│   │   ├── components/                  # UI Components (Navbar, Footer, HotelReg, HotelCard, etc.)
│   │   │   └── hotelOwner/              # Owner panel layout components (Sidebar, Admin Navbar)
│   │   ├── context/                     # Global AppContext & State Provider
│   │   ├── pages/                       # Guest pages (Home, AllRooms, RoomDetails, MyBookings)
│   │   │   └── hotelOwner/              # Owner dashboard pages (DashBoard, AddRoom, ListRoom)
│   │   ├── App.jsx                      # Main app layout & React Router configuration
│   │   └── main.jsx                     # Vite entry point wrapped in ClerkProvider
│   ├── .env.example                     # Client environment template
│   └── vercel.json                      # Frontend SPA routing rewrite configuration
│
└── server/                              # Express v5 Backend Server
    ├── configs/                         # Services configuration (db.js, cloudinary.js, nodemailer.js)
    ├── controllers/                     # Endpoint controllers & webhook handlers
    │   ├── bookingController.js         # Booking logic, availability checks & Stripe payment
    │   ├── clerkWebHooks.js             # Svix Clerk user sync handler
    │   ├── hotelController.js           # Hotel owner registration handler
    │   ├── roomController.js            # Room CRUD & Cloudinary base64 image uploader
    │   ├── stripeWebhooks.js            # Stripe payment verification webhook
    │   └── userController.js            # User profile & recent search cities handler
    ├── middleware/                      # Middlewares (authMiddleware.js, uploadMiddleware.js)
    ├── models/                          # Mongoose Schemas (User, Hotel, Room, Booking)
    ├── routes/                          # Express Routes (userRoutes, hotelRoutes, roomRoutes, bookingRoutes)
    ├── .env.example                     # Server environment template
    ├── server.js                        # Express server entry point
    └── vercel.json                      # Vercel Serverless Function rewrite configuration
```

---

## 📡 API Endpoint Reference

### 👤 User Endpoints (`/api/user`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/user` | Yes | Get authenticated user role and recent searched cities |
| `POST` | `/api/user/store-recent-search` | Yes | Save recent search city destination (up to 3 cities) |

### 🏨 Hotel Endpoints (`/api/hotels`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/hotels` | Yes | Register authenticated user as a Hotel Owner |

### 🛏️ Room Endpoints (`/api/rooms`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/rooms` | No | Fetch all available rooms with populated hotel & owner details |
| `POST` | `/api/rooms` | Yes | Upload images & create a new room listing for owner's hotel |
| `GET` | `/api/rooms/owner` | Yes | Fetch all rooms owned by the authenticated hotel owner |
| `POST` | `/api/rooms/toggle-availability` | Yes | Toggle room availability status (`isAvailable`) |

### 📅 Booking Endpoints (`/api/bookings`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/bookings/check-availability` | No | Check if a room is available for given check-in/check-out dates |
| `POST` | `/api/bookings/book` | Yes | Create room reservation and dispatch confirmation email |
| `GET` | `/api/bookings/user` | Yes | Fetch all reservations made by authenticated guest |
| `GET` | `/api/bookings/hotel` | Yes | Fetch owner dashboard metrics (total bookings & revenue) |
| `POST` | `/api/bookings/stripe-payment` | Yes | Create a Stripe Checkout Session for a booking ID |

### ⚡ Webhook Endpoints
| Method | Endpoint | Verification | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/clerk` | Svix Signature | Sync Clerk user creation, update, and deletion events |
| `POST` | `/api/stripe` | Stripe Signature | Mark booking payment status (`isPaid: true`) upon payment success |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js** (`v18.0` or higher) & `npm`
- **MongoDB** cluster database URI
- **Clerk** account credentials
- **Cloudinary** media account
- **Stripe** developer account
- **Brevo / Gmail** SMTP email account

---

### 1. Clone Repository
```bash
git clone https://github.com/Satyam1030/QuickStay.git
cd QuickStay
```

### 2. Frontend Setup (`client`)
```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BACKEND_URL=http://localhost:3000
VITE_CURRENCY=$
```

Start Vite dev server:
```bash
npm run dev
```

---

### 3. Backend Setup (`server`)
```bash
cd ../server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=3000
MONGODB_URI=mongodb+srv://user:password@cluster0.mongodb.net/hotel-booking

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Payments
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Transport (Nodemailer / Brevo / Gmail)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASS=xsmtpsib-...
SENDER_EMAIL=your_email@domain.com
```

Start Node Express server:
```bash
npm run server
```

---

## 🔔 Third-Party Service Configurations

### 1. Clerk User Webhook Sync
1. Navigate to **[Clerk Dashboard](https://dashboard.clerk.com/)** $\rightarrow$ **Webhooks**.
2. Click **Add Endpoint** pointing to: `https://your-backend-url.vercel.app/api/clerk`.
3. Select events: `user.created`, `user.updated`, `user.deleted`.
4. Copy the **Signing Secret** into your backend `.env` as `CLERK_WEBHOOK_SECRET`.

### 2. Stripe Checkout & Webhook Sync
1. Navigate to **[Stripe Dashboard](https://dashboard.stripe.com/)** $\rightarrow$ **Developers** $\rightarrow$ **Webhooks**.
2. Click **Add endpoint** pointing to: `https://your-backend-url.vercel.app/api/stripe`.
3. Select event: `payment_intent.succeeded`.
4. Copy the **Signing secret** into your backend `.env` as `STRIPE_WEBHOOK_SECRET`.

### 3. Cloudinary Image Media Storage
1. Navigate to **[Cloudinary Console](https://console.cloudinary.com/)** $\rightarrow$ **Dashboard**.
2. Copy `Cloud Name`, `API Key`, and `API Secret` into your backend `.env` as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
3. *(Optional)* Create an **Unsigned Upload Preset** under **Settings** $\rightarrow$ **Upload** $\rightarrow$ **Upload Presets** and set `CLOUDINARY_UPLOAD_PRESET=your_preset_name` to bypass secret signing.

### 4. Nodemailer & Brevo SMTP Transactional Emails
1. Log in to **[Brevo Dashboard](https://app.brevo.com/)** $\rightarrow$ **Transactional** $\rightarrow$ **SMTP & API Keys**.
2. Copy the **SMTP Key** (starts with `xsmtpsib-...`) and paste it as `SMTP_PASS`.
3. Set `SMTP_USER` to your Brevo SMTP login email and `SMTP_HOST=smtp-relay.brevo.com`.

---

## ☁️ Vercel Deployment Guide

Both `client` and `server` directories contain native `vercel.json` configurations optimized for zero-config Vercel deployment:

### Deploying the Frontend (`client`)
1. Import `QuickStay` repository on **Vercel**.
2. Select `client` as the **Root Directory**.
3. Add environment variables: `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_BACKEND_URL`, `VITE_CURRENCY`.
4. Click **Deploy**.

### Deploying the Backend (`server`)
1. Import `QuickStay` repository as a separate project on **Vercel**.
2. Select `server` as the **Root Directory**.
3. Add all backend environment variables (`MONGODB_URI`, `CLERK_*`, `CLOUDINARY_*`, `STRIPE_*`, `SMTP_*`).
4. Click **Deploy**.

> 💡 **Note**: After adding or modifying environment variables in Vercel, navigate to the **Deployments** tab and click **Redeploy** (without build cache) to apply new variables to your live backend functions.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
