import mongoose from "mongoose";

const dbConnection = () =>{
    mongoose.connect(process.env.MONGODB_URI,{
        dbName: "WareWave-CLG"
    }).then(()=>{
        console.log("Connected to WareWave")
    }).catch((error)=>{
        console.log(`Failed to connect to WareWave: ${error}`)
    })
}

export default dbConnection;