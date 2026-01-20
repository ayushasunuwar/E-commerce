import express from "express";
import { placeOrder, placeOrderStripe, placeOrderRazor, allOrders, userOrders, orderStatus } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authUser.js"

const orderRouter = express.Router();

//Admin feature
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, orderStatus)

//Payment feature
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazor)

//user feature
orderRouter.post('/userorder', authUser, userOrders)

export default orderRouter;