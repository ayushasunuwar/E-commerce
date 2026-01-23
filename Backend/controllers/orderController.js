
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel';
import Stripe from 'stripe'

//use secret key to create instance of key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    
    try {
        
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

           const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = orderModel.save(orderData)

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item_name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
             price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.session.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: Payment
        })

        res.json({success: true, session_url: session.url})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//verify Stripe
const verifyStripe = async(req, res) => {
    const { orderId, success, userId } = req.body

    try {
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})

            await userModel.findByIdAndUpdate(userId, {cartData: {}})

            res.json({success: true})
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//All orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({
            success: true, orders
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false, message: error.message
        })
    }
}

// user order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({userId})
        res.json({
            success: true, orders
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false, message: error.message
        })
    }
}

// update order status from admin panel
const orderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { placeOrder, placeOrderStripe, verifyStripe,allOrders, userOrders, orderStatus  }