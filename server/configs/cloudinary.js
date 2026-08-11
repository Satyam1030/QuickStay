import {v2 as cloudinary} from "cloudinary";

const connectCloudinary=async ()=>{
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET_KEY;

    if (cloudName && apiKey && apiSecret) {
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
        });
        console.log("Cloudinary configured successfully");
    } else {
        console.warn("Cloudinary configuration missing! Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
    }
}

export default connectCloudinary;
