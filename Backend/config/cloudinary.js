import {v2 as cloudinary} from "cloudinary"

const connectCloudinary = async() =>{

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        cloud_key: process.env.CLOUDINARY_KEY,
        cloud_secret: process.env.CLOUDINARY_SECRET
    })

}

export default connectCloudinary