import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadImage = async (imagePath, folder) => {
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: `Mern Blog App`
        });

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }
        return result.secure_url
    } catch (error) {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }
        console.error("Cloudinary upload error", error);
        throw new Error("Image upload failed")
    }
};


export default uploadImage