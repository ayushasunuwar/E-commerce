import mongoose from "mongoose";


//schema for users
const userSchema = new mongoose.Schema({
    //define object property and their types
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}}
},
 {minimize: false}
)

//creating user model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel