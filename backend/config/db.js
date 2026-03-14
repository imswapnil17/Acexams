import mongoose from "mongoose";
import { ENV_VARS } from "./config.js";

export const connectDB = async () =>{
    await mongoose.connect(ENV_VARS.MONGO_URI);

    console.log("Database Connected!")
}