import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js"
const app = express()
app.use(express.json())

app.use("/api/v1/auth",authRoutes)

app.listen(4000,()=>{
    console.log("server is live at http://localhost:" +4000);
    connectDB()   
})