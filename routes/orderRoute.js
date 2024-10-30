import express from "express";
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateOrdersStatus, userOrders } from "../controllers/orderCantrollers.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";


const orderRouter = express.Router();


// Admin Routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrdersStatus);

// Payment Routes
orderRouter.post("/place",userAuth,placeOrder)
orderRouter.post("/stripe",userAuth,placeOrderStripe)
orderRouter.post("/razorpay",userAuth,placeOrderRazorpay)

// User Routes
orderRouter.post("/userorders",userAuth,userOrders)


export default orderRouter