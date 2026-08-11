import mongoose from "mongoose";
import dns from "dns";

try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
    // Ignore DNS override errors in serverless environments
}

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("DB connected"));
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGODB_URI environment variable is missing!");
            return;
        }
        let dbUrl = uri;
        if (!dbUrl.includes('/hotel-booking')) {
            if (dbUrl.includes('?')) {
                dbUrl = dbUrl.replace('?', '/hotel-booking?');
            } else if (dbUrl.endsWith('/')) {
                dbUrl = `${dbUrl}hotel-booking`;
            } else {
                dbUrl = `${dbUrl}/hotel-booking`;
            }
        }
        await mongoose.connect(dbUrl);
    } catch (error) {
        console.log("DB Connection Error:", error.message);
    }
}

export default connectDB;