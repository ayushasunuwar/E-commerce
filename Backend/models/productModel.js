import mongoose from "mongoose";

//schema for product
const productSchema = new mongoose.Schema({
    //defining object property and their type
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    sizes: {type: Array, required: true},
    bestSeller: {type: Boolean},
    date: {type: Date, required: true}
})

//creating model
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;