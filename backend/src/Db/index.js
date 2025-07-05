import mongoose from "mongoose";
import { DB_name } from "../constant.js";


export async function connectDB(){
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
         //TODO: console.log(connectionInstance) check what mongoose.connect returning
       console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}