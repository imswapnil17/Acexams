import express from "express"
import { createTask, deleteTask, editTask, getTasks } from "../Controllers/TaskController.js"
import { protectedRoute } from "../Middlewares/protectedRoute.js"

const taskRouter = express.Router()
taskRouter.get("/get-tasks",getTasks)
taskRouter.post("/create-task",createTask)
taskRouter.put("/edit-task/:id",editTask)
taskRouter.delete("/delete-task/:id",deleteTask)


export default taskRouter;