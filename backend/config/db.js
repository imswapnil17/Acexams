import mongoose from "mongoose"

export const connectDB = async () =>{
    await mongoose.connect("mongodb://localhost:27017/acexams");

    console.log("Database Connected!")
}