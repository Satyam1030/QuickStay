import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/user.js";

//middleware to check if user is authenticated

export const protect=async(req,res,next)=>{
    try {
        let userId = null;
        try {
            const auth = getAuth(req);
            userId = auth?.userId;
        } catch (err) {
            // Fallback if getAuth fails
        }
        if (!userId) {
            userId = req.auth?.userId;
        }

        if(!userId){
            return res.json({success:false,message:"not authenticated"});
        }

        let user=await User.findById(userId);
        if(!user){
            try {
                // Auto-create user profile if missing (e.g. webhooks not active during local dev)
                const clerkUser = await clerkClient.users.getUser(userId);
                const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
                const username = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || "User";
                const image = clerkUser.imageUrl || "";

                user = await User.create({
                    _id: userId,
                    email,
                    username,
                    image,
                    role: "user"
                });
            } catch (err) {
                console.error("Auto user creation error:", err.message);
                return res.json({success:false,message:"user profile not found"});
            }
        }
        req.user=user;
        next();
    } catch (error) {
        console.error("Protect middleware error:", error.message);
        return res.json({success:false,message:error.message || "Authentication error"});
    }
}