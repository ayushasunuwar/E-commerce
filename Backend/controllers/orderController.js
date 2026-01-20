import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel';

//plcaing order using COD
const placeOrder = async(req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod,
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, {cartData: {}})
        res.json({
            success: true, message: "Order Placed"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false, message: error.message
        })
    }
}

//placing order using stripe
const placeOrderStripe = async (req, res) => {

}

//placing order using razorpay
const placeOrderRazor = async(req, res) => {

}

//All orders data for Admin Panel
const allOrders = async (req, res) => {

}

// user order data for frontend
const userOrders = async (req, res) => {

}

// update order status from admin panel
const orderStatus = async (req, res) => {

}

export { placeOrder, placeOrderStripe, placeOrderRazor,allOrders, userOrders, orderStatus  }