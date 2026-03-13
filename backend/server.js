import express from "express"
import path from "path"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())

app.get("/hello",(req,res)=>{
    res.status(200).json({success:true,message:"Hello, World!"})
})

app.listen(4000,()=>{
    console.log("server is live at http://localhost:" +4000);
    
})