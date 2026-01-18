import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"

//controller functions
//function for add product
const addProduct = async (req, res) => {
    try {
        // get product details from request body
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        //get image from request files
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        //filter out any undefined images from array
        const images = [image1, image2, image3, image4].filter((item) => item != undefined);

        //upload all the valid images to cloudinary and get their secure url
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        //Prepare the product object to store in database
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller == "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        //create a new instance of product model with the prepared data
        const product = new productModel(productData)

        //save the product document in the mongoDB database
        await product.save()

        res.json({
            success: true, message: "Product Added"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false, message: error.message
        })
    }
}

//function for list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({
            success: true, products
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false, message: error.message
        })
    }
}

//function for remove products
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({
            success: true, message: "Product Removed"
        })
    } catch (error) {
        console.log(error)
        res.json({
            succes: false, message: error.message
        })
    }
}

//function for single product
const singleProduct = async (req, res) => {
    try {
    const { productId } = req.body;
    const product = productModel.findById(productId)
    res.json({
        succes: true, message: product
    })
    } catch (error) {
        console.log(error)
        res.json({
            success: false, message: error.message
        })
    }
}

export { addProduct, listProducts, removeProduct, singleProduct }