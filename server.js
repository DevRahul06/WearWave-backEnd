import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from './database/db.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';


// App Config
dotenv.config({ path: './config/.env' });

const app = express()
const port = process.env.PORT || 5000


// middlewares
app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()

// api endpoints
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log('Server run at Port :' + port)
})