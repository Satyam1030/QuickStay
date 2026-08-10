import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/user.js";

//middleware to check if user is authenticated

export const protect=async(req,res,next)=>{
    const { userId } = getAuth(req);
    const effectiveUserId = userId || req.auth?.userId;

    if(!effectiveUserId){
        return res.json({success:false,message:"not authenticated"})
    }else{
        let user=await User.findById(effectiveUserId);
        if(!user){
            try {
                // Auto-create user profile if missing (e.g. webhooks not active during local dev)
                const clerkUser = await clerkClient.users.getUser(effectiveUserId);
                const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
                const username = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || "User";
                const image = clerkUser.imageUrl || "";

                user = await User.create({
                    _id: effectiveUserId,
                    email,
                    username,
                    image,
                    role: "user"
                });
            } catch (err) {
                return res.json({success:false,message:"user profile not found"});
            }
        }
        req.user=user;
        next()
    }
}