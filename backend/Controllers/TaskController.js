import User from "../Models/UserModel.js";
import { getUserData } from "./UserController.js";
import Task from "../Models/TasksModel.js"
import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/config.js";
export const createTask = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Fields Are Empty!" })
        }
        const { title, content } = req.body;
        if (!title|| !content) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }
        const userId = jwt.verify(req.cookies['jwt-acexams'],ENV_VARS.JWT_TOKEN).userId
        

        const user = await User.findOne({ _id: userId }).populate("tasks")
        const newTask = new Task({
            title,
            author: user.username,
            content,
        })
        await newTask.save()
        user.tasks.push(newTask._id)
        await user.save()
        return res.status(200).json({ success: true, message: "New task created !"})

    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const editTask = async (req, res) => {
    try {
        if (!req.params) {
            return res.status(400).json({ success: false, message: "No Tasks Found" })
        }
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Empty Fields" })
        }
        const { title, content } = req.body
        const { id } = req.params

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        )
        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" })
        }
        return res.status(200).json({ success: true, message: "Task Updated", task: updatedTask })


    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const deleteTask = async (req, res) => {
    try {
        if (!req.params) {
            return res.status(404).json({ success: false, message: "Task not found" })

        }
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id)

        if(!deletedTask){
            return res.status(404).json({success:false,message:"Task not found"})
        }
        return res.status(200).json({success:true,message:"Deleted Task"})
        


    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getTasks = async (req,res)=>{
    try{
        const userId = jwt.verify(req.cookies['jwt-acexams'],ENV_VARS.JWT_TOKEN).userId
        const Tasks = await User.findOne({_id:userId},("tasks")).populate("tasks")
        if(!Tasks){
            return res.status(400).json({success:"False",message:"No Tasks Found"})
        }
        console.log(Tasks)
        return res.status(201).json({success:"True",message:"Tasks found",response:Tasks})
    }
    catch (error){
        console.log(error)
        return res.status(500).json({success:"false",message:"Internal Server Error"})
    }
}