import User from "../models/user.js";

import { Webhook } from "svix";

const clerkWebHooks=async(req,res)=>{
    try{
        //create svix instance with clerk webhook secret
        const wHook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //headers
        const headers={
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        }

        //verifying headers
        await wHook.verify(JSON.stringify(req.body),headers)

        //getting data from request body
        const {data,type}=req.body

        const email = data.email_addresses?.[0]?.email_address || "";
        const username = `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.username || "User";
        const image = data.image_url || "";

        //switch cases for different cases
        switch(type){
            case "user.created":{
                const userData = {
            _id: data.id,
            email,
            username,
            image,
            }
                await User.create(userData);
                break;
            }

            case "user.updated":{
                const userData = {
            _id: data.id,
            email,
            username,
            image,
        }
                await User.findByIdAndUpdate(data.id,userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }

        res.json({success:true,message:"WebHook recieved"})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

export default clerkWebHooks;