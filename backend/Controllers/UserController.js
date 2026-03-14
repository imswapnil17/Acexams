
import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/config.js"
import User from "../Models/UserModel.js"
export const getUserData =  async (req,res)=>{
   try{
        if(!req.cookies){
        return res.status(400).json({success:false,message:"Please login to continue"})
    }
    if(!req.cookies['jwt-acexams']){
        return res.status(400).json({success:false,message:"Please login to continue"})
    }
    const userId = jwt.verify(req.cookies['jwt-acexams'],ENV_VARS.JWT_TOKEN).userId;
    const findUser = await User.findOne({_id:userId},("name username email -_id"))
    if(!findUser){
        return res.status(400).json({success:false,message:"Please login to continue"})
    }
    res.status(201).json({success:true,user:findUser})
    
    }
    catch (error){
        console.error(error)
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}