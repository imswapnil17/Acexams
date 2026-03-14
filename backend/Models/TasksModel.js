import mongoose from "mongoose";


const tasksSchema = mongoose.Schema({
    title: String,
    author: String,
    content: {type:"String",default:""},
    date: {type:Date,default:Date.now},
    
},{timestamps:true})

const Task = mongoose.model("Tasks",tasksSchema)

export default Task