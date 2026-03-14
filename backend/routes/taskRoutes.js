import express from "express"
import { createTask, deleteTask, editTask } from "../Controllers/TaskController.js"
import { protectedRoute } from "../Middlewares/protectedRoute.js"

const taskRouter = express.Router()

taskRouter.post("/create-task",protectedRoute,createTask)
taskRouter.put("/edit-task/:id",protectedRoute,editTask)
taskRouter.delete("/delete-task/:id",protectedRoute,deleteTask)


export default taskRouter;