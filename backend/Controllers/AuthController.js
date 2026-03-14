import { ENV_VARS } from "../config/config.js";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { generateTokenAndSetCookies } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { email, password, username, name } = req.body;
        if (!email || !password || !username || !name) {
            return res.status(400).json({ success: false, message: "All Fields Are Required" })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email" })

        }
        if (password < 5) {
            return res.status(400).json({ success: false, message: "Password must be longer than 5 letters" })
        }

        const existingEmail = await User.findOne({ email: email })

        if (existingEmail) {
            return res.status(400).json({ success: false, message: "User Already Exists !" })

        }
        const existingUsername = await User.findOne({ username: username })

        if (existingUsername) {
            return res.status(400).json({ success: false, message: "Username Already Exists !" })

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = new User({
            email,
            password: hashedPass,
            username,
            name,
        })
        await newUser.save();
        generateTokenAndSetCookies(newUser._id, res)
        return res.status(201).json({ success: true, user: { newUser, password: "" } })

    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ success: "False", message: "Internal Server Error" })
    }
}
export async function login(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "All fields are Required" })

        }
        const existingUser = await User.findOne({ username })
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User doesn't exist. \nPlease register first." })
        }
        const decodePass = await bcrypt.compare(password, existingUser.password)
        if (!decodePass) {
            return res.status(400).json({ success: false, message: "Password is not correct" })
        }
        generateTokenAndSetCookies(existingUser._id, res);
        return res.status(201).json({ success: true, message: "User Logged In" })

    }
    catch (error) {
        console.error(error)
        res.status(500).json({ success: "False", message: "Internal Server Error" })
    }
}