import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import { errorMiddleware } from './middleware/error.js';


// App Config
dotenv.config({ path: './config/.env' });

const app = express()
const port = process.env.PORT || 5000


// middlewares
app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()
app.use(errorMiddleware)

// api endpoints
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log('Server run at Port :' + port)
})