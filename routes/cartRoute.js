import express from "express";
import {updateCart,UserCart,addToCart} from "../controllers/cartCantrollers.js"
import authUser from "../middleware/userAuth.js";

const cartRouter = express.Router()

cartRouter.post("/get",authUser,UserCart)
cartRouter.post("/add",authUser,addToCart)
cartRouter.post("/update",authUser,updateCart)


export default cartRouter