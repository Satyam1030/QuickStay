# 🏨 QuickStay — Modern Hotel Booking & Management Application

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-v5-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk)](https://clerk.com/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?logo=vercel)](https://vercel.com/)

**QuickStay** is a full-stack hotel booking platform designed to connect travelers with premium accommodations. Built using React 19, Vite, Tailwind CSS v4, Express v5, MongoDB, Clerk Authentication, and Cloudinary, QuickStay offers a seamless experience for both guests searching for stays and hotel owners managing property listings.

---

## ✨ Key Features

### 👤 Guest Experience
- 🔍 **Interactive Search & Filtering**: Search and filter accommodations by location, room type, and price range.
- 🌟 **Featured Destinations & Exclusive Offers**: Hand-picked travel spots and curated promotional stay offers.
- 🛏️ **Room Details & Availability**: View complete room information including descriptions, pricing, amenity badges, check-in date validation, and high-res image galleries.
- 📧 **Instant Email Booking Confirmation**: Automatic email notifications with complete reservation details sent upon booking.
- 📅 **Booking Management**: Track active reservations and view complete booking history in real-time.
- 🔐 **Authentication**: Fast and secure login/signup powered by Clerk.

### 🏢 Hotel Owner / Admin Panel
- 📊 **Owner Dashboard**: View total bookings, earnings, and manage active hotel listings.
- ➕ **Add Room Listings**: Intuitive interface to create room listings with rich descriptions, pricing, amenity tags, and multi-image uploads via Cloudinary.
- 🛠️ **Manage Listings**: Easily toggle room availability, update details, or delete listings.

### ⚡ Clerk Webhooks & Real-Time Sync
- 🔄 **User Synchronization**: Automatically sync user account creation, updates, and deletions from Clerk to MongoDB using Svix webhook verification (`/api/clerk`).
- 🌐 **Serverless Compatibility**: Optimized MongoDB connection and cross-platform temp file uploads for Vercel backend deployment.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Auth**: Clerk (`@clerk/react`)
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js + Express v5
- **Middleware**: `@clerk/express`, CORS, Multer
- **Database**: MongoDB & Mongoose
- **Image Storage**: Cloudinary Media Management
- **Email Service**: Nodemailer / Brevo SMTP
- **Webhooks**: Svix (Clerk Webhook Signature Verification)

### Deployment & Hosting
- **Vercel**: Native Vercel deployment configuration (`vercel.json`) for SPA frontend routing and serverless Express backend functions.

---

## 📁 Project Structure

```
QuickStay/
├── client/                      # React 19 Frontend
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Icons & visual assets
│   │   ├── components/          # Reusable UI components (Navbar, Footer, HotelReg, etc.)
│   │   ├── context/             # Global App Context & state management
│   │   └── pages/               # Guest & Owner dashboard pages (AllRooms, RoomDetails, AddRoom, MyBookings, etc.)
│   ├── .env.example             # Frontend environment template
│   └── vercel.json              # Vercel SPA rewrite configuration
│
└── server/                      # Node.js + Express Backend
    ├── configs/                 # Database & Cloudinary service configurations
    ├── controllers/             # API route logic & Clerk webhook handlers
    ├── middleware/              # Authentication & upload middlewares
    ├── models/                  # Mongoose data schemas (User, Room, Hotel, Booking)
    ├── routes/                  # API endpoint declarations
    ├── .env.example             # Backend environment template
    ├── server.js                # Express app entry point
    └── vercel.json              # Vercel serverless deployment config
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (`v18` or higher) & `npm`
- **MongoDB** Database connection URI
- **Clerk** account credentials
- **Cloudinary** account credentials

---

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/Satyam1030/QuickStay.git
cd QuickStay
```

#### 2. Frontend Setup (`client`)
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory based on `.env.example`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BACKEND_URL=https://quick-stay-backend-beryl.vercel.app
VITE_CURRENCY=$
```
Start the development server:
```bash
npm run dev
```

#### 3. Backend Setup (`server`)
```bash
cd ../server
npm install
```
Create a `.env` file in the `server` directory based on `.env.example`:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

SENDER_EMAIL=your_email@domain.com
```
Start the backend server:
```bash
npm run server
```

---

## 🔔 Clerk Webhook Configuration

To enable real-time user database synchronization between Clerk and your MongoDB backend:
1. Open your **[Clerk Dashboard](https://dashboard.clerk.com/)** -> navigate to **Webhooks**.
2. Add an Endpoint pointing to your backend URL: `https://your-backend-url.vercel.app/api/clerk`.
3. Subscribe to the following user events: `user.created`, `user.updated`, `user.deleted`.
4. Copy the **Signing Secret** and paste it into your backend `.env` as `CLERK_WEBHOOK_SECRET`.

---

## ☁️ Deployment Guide (Vercel)

Both `client` and `server` folders contain custom `vercel.json` configurations designed for smooth deployment on Vercel:

- **Frontend Deployment**: Import the repository on Vercel, select `client` as the Root Directory, build command `npm run build`, and add `VITE_*` environment variables.
- **Backend Deployment**: Import the repository on Vercel, select `server` as the Root Directory, and set all backend environment variables (`MONGODB_URI`, `CLOUDINARY_*`, `CLERK_*`) in Vercel settings.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
