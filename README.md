# 🏨 QuickStay — Modern Hotel Booking Application

QuickStay is a full-stack hotel booking platform designed to connect travelers with premium accommodations. Built using React, Vite, Tailwind CSS, Express, MongoDB, and Clerk Authentication, QuickStay offers a seamless experience for both travelers looking for their next stay and hotel owners managing their listings.

---

## ✨ Features

### 👤 Guest Experience
- **Hero & Search**: Search for rooms by location, dates, and guest capacity.
- **Featured Destinations & Exclusive Offers**: Interactive promotional sections showcasing top travel spots.
- **Room Listings & Details**: View complete room information including amenities, pricing, star ratings, and image galleries.
- **My Bookings**: Track and manage all active and past room reservations.
- **Authentication**: Fast and secure login/signup powered by Clerk.

### 🏢 Hotel Owner / Admin Panel
- **Owner Dashboard**: Real-time overview of total bookings, revenue, and active listings.
- **Add Room**: Interface to create new room listings with detailed descriptions, pricing, amenities, and image uploads.
- **Manage Listings**: Easily list, edit, or delete existing rooms.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Auth**: Clerk (`@clerk/react`)

### Backend
- **Runtime**: Node.js + Express (v5)
- **Database**: MongoDB + Mongoose
- **Image Storage**: Cloudinary + Multer
- **Webhooks**: Svix

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Connection String
- Clerk API Keys
- Cloudinary Account Credentials

---

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Satyam1030/QuickStay.git
   cd QuickStay
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd ../server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
   Start the backend server:
   ```bash
   npm run server
   ```

---

## 📁 Project Structure

```
QuickStay/
├── client/              # React + Vite Frontend
│   ├── public/          # Static Assets
│   └── src/
│       ├── assets/      # Icons & Image Assets
│       ├── Components/  # Reusable UI Components
│       └── Pages/       # User & Owner Pages
└── server/              # Node.js + Express Backend
    ├── configs/         # Database & Service Configs
    ├── controllers/     # API Route Logic
    ├── middleware/      # Custom Auth & Upload Middlewares
    ├── models/          # Mongoose Data Models
    └── routes/          # API Endpoint Declarations
```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
