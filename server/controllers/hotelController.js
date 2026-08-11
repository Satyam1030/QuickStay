import Hotel from "../models/Hotel.js";
import User from "../models/user.js";

export const registerHotel=async(req,res)=>{
    try {
        const {name,address,contact,city}=req.body;
        if(!name || !address || !contact || !city){
            return res.json({success:false,message:"All fields (name, address, contact, city) are required"});
        }
        if(!req.user){
            return res.json({success:false,message:"User profile not found"});
        }
        const owner=req.user._id;

        const hotel=await Hotel.findOne({owner})
        if(hotel){
            return res.json({success:false,message:"Hotel already registered"});
        }else{
            await Hotel.create({name,address,contact,city,owner});
            await User.findByIdAndUpdate(owner,{role:"hotelOwner"})
        }

        res.json({success:true,message:"Hotel registered successfully"})
    } catch (error) {
        console.error("registerHotel error:", error.message);
        res.json({success:false,message:error.message});
    }
}