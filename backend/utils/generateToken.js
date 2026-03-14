import jwt from "jsonwebtoken"
import {ENV_VARS} from "../config/config.js"

export const generateTokenAndSetCookies = (userId,res)=>{
    const token = jwt.sign({userId},ENV_VARS.JWT_TOKEN)
    
    res.cookie("jwt-acexams",token,{
        httpOnly:true,
        secure: ENV_VARS.NODE_ENV != "development",
        sameSite:"strict",
    });
    return token;
}