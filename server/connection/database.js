import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



export const connectDB = async () =>{
    try{
        const conn = await mongoose.connect('mongodb+srv://sinvan:sinvan123@cluster0.l6dexcr.mongodb.net/?retryWrites=true&w=majority',{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        console.log(`MongoDB Connected:${conn.connection.host}`)
    }catch (error){
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}