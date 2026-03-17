
import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/config.js"
import User from "../Models/UserModel.js"

import bcryptjs from "bcryptjs"
export const getUserData = async (req, res) => {
    try {
        if (!req.cookies) {
            return res.status(400).json({ success: false, message: "Please login to continue" })
        }
        if (!req.cookies['jwt-acexams']) {
            return res.status(400).json({ success: false, message: "Please login to continue" })
        }
        const userId = jwt.verify(req.cookies['jwt-acexams'], ENV_VARS.JWT_TOKEN).userId;
        const findUser = await User.findOne({ _id: userId }, ("name username email -_id"))
        if (!findUser) {
            return res.status(400).json({ success: false, message: "Please login to continue" })
        }
        return res.status(201).json({ success: true, user: { ...findUser._doc, password: "" } })

    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const updateUser = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({ success: false, message: "Please enter the details to update the user." })
        }
        const { name, email, og_password, new_password } = req.body

        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Name and email field cannot be empty" })
        }

        const userId = jwt.verify(req.cookies['jwt-acexams'], ENV_VARS.JWT_TOKEN).userId;

        const findUser = await User.findOne({ _id: userId })

        if (!findUser) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        if (!new_password && !og_password) {
            try {

                const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { returnDocument:"after" }).exec()
                await updatedUser.save()
                return res.status(201).json({ success: true, user: { ...updatedUser._doc, password: "", message: "User Updated Successfully" } })

            }
            catch (error) {
                if (error.code == 11000) {
                    return res.status(400).json({ success: false, message: "This email is already registered" })

                }
                else {
                    console.error(error)
                    return res.status(500).json({ success: false, message: "Internal Server Error" })
                }
            }

        }



        const passCheck = await bcryptjs.compare(og_password, findUser.password)
        if (!passCheck) {
            return res.status(400).json({ status: false, message: "Old Password do not match" })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPass = await bcryptjs.hash(new_password, salt)
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password: hashedPass })
        await updatedUser.save()

        return res.status(201).json({ success: true, user: { ...updatedUser._doc, password: "", message: "User Updated Successfully" } })

    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const deleteUser = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies['jwt-acexams'], ENV_VARS.JWT_TOKEN).userId;
        const findUser = await User.findByIdAndDelete(userId);
        if (!findUser) {
            return res.status(400).json({ success: false, message: "User doesn't exists" })
        }
        return res.status(201).json({ success: true, message:"User deleted successfully"})

    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}