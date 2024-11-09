import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateOrdersStatus,
  userOrders,
  verifyStripe,
} from "../controllers/orderCantrollers.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";
import authUser from "../middleware/userAuth.js";

const orderRouter = express.Router();

// Admin Routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrdersStatus);

// Payment Routes
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/stripe", userAuth, placeOrderStripe);

// User Routes
orderRouter.post("/userorders", userAuth, userOrders);

// Verify Payment
orderRouter.post("/verifystripe", authUser, verifyStripe);

export default orderRouter;
