import Hotel from "../models/Hotel.js";
import {v2 as cloudinary} from "cloudinary";
import Room from "../models/Room.js";

//Api to create new room for hotel
export const createRoom=async(req,res)=>{
    try {
        const {roomType,pricePerNight,amenities}=req.body;
        const hotel=await Hotel.findOne({owner:req.user._id});

        if(!hotel){
            return res.json({success:false,message:"No Hotel found for this user account. Please register your hotel first."})
        }

        if(!req.files || req.files.length===0){
            return res.json({success:false,message:"At least one room image is required"})
        }

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET_KEY;

        if(!cloudName || !apiKey || !apiSecret){
            return res.json({
                success:false,
                message:"Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing on the server."
            });
        }

        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret
        });

        //upload image to cloudinary
        let images = [];
        try {
            const uploadImages=req.files.map(async(file)=>{
                const response=await cloudinary.uploader.upload(file.path, {
                    resource_type: "auto",
                    folder: "quickstay"
                });
                return response.secure_url;
            });
            images=await Promise.all(uploadImages);
        } catch (cloudErr) {
            console.error("Cloudinary upload error:", cloudErr.message || cloudErr);
            return res.json({
                success:false,
                message:`Image upload failed: ${cloudErr.message || "Cloudinary 403 Forbidden. Please verify Cloudinary API credentials in your server .env file."}`
            });
        }

        let parsedAmenities = [];
        try {
            parsedAmenities = typeof amenities === "string" ? JSON.parse(amenities) : (amenities || []);
        } catch (e) {
            parsedAmenities = [];
        }

        await Room.create({
            hotel:hotel._id,
            roomType,
            pricePerNight:+pricePerNight,
            amenities: parsedAmenities, 
            images,
        })
        res.json({success:true,message:"Room created successfully"})
    } catch (error) {
        console.error("createRoom error:", error.message);
        res.json({success:false,message:error.message})
    }
}

//api to get all rooms
export const getRooms=async(req,res)=>{
    try {
        const rooms=await Room.find({isAvailable:true}).populate({
            path:'hotel',
            populate:{
                path:'owner',
                select:'image'
            }
        }).sort({createdAt:-1})
        res.json({success:true,rooms})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


//api to get all rooms for specific hotel
export const getOwnerRooms=async(req,res)=>{
    try {
        const hotelData=await Hotel.findOne({owner:req.user._id})
        if(!hotelData){
            return res.json({success:false,message:"No Hotel found"})
        }
        const rooms=await Room.find({hotel:hotelData._id.toString()}).populate("hotel")
        res.json({success:true,rooms})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//api to toggle availability of room
export const toggleRoomAvailability=async(req,res)=>{
    try {
        const {roomId}=req.body;
        const roomData=await Room.findById(roomId)
        roomData.isAvailable=!roomData.isAvailable;
        await roomData.save();
        res.json({success:true,message:"Room Availability updated"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}