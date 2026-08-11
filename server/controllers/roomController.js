import Hotel from "../models/Hotel.js";
import {v2 as cloudinary} from "cloudinary";
import Room from "../models/Room.js";
import fs from "fs";

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

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
        const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
        const apiSecret = (process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET_KEY)?.trim();
        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET?.trim();

        if(!cloudName || (!uploadPreset && (!apiKey || !apiSecret))){
            return res.json({
                success:false,
                message:"Cloudinary credentials missing on server. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET (or CLOUDINARY_UPLOAD_PRESET)."
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
                let fileSource;
                if (file.buffer) {
                    const b64 = Buffer.from(file.buffer).toString("base64");
                    fileSource = `data:${file.mimetype || "image/jpeg"};base64,${b64}`;
                } else if (file.path && fs.existsSync(file.path)) {
                    const fileBuffer = fs.readFileSync(file.path);
                    const b64 = Buffer.from(fileBuffer).toString("base64");
                    fileSource = `data:${file.mimetype || "image/jpeg"};base64,${b64}`;
                } else {
                    throw new Error("Invalid file upload input");
                }

                let response;
                if (uploadPreset) {
                    response = await cloudinary.uploader.unsigned_upload(fileSource, uploadPreset, {
                        cloud_name: cloudName,
                        folder: "quickstay"
                    });
                } else {
                    response = await cloudinary.uploader.upload(fileSource, {
                        resource_type: "auto",
                        folder: "quickstay"
                    });
                }
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