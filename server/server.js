import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import stripeWebhooks from "./controllers/stripeWebhooks.js";

connectDB();
connectCloudinary();

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

//api to listen to stripe webhooks

app.post('/api/stripe',express.raw({type:"application/json"}),stripeWebhooks)

app.use(express.json());
app.use(clerkMiddleware())

//api to listen clerk webhook
app.use("/api/clerk",clerkWebHooks);

app.get('/',(req,res)=>res.send("API is working"));
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error("Express Error:", err.stack || err.message);
    res.json({ success: false, message: err.message || "Internal Server Error" });
});

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

