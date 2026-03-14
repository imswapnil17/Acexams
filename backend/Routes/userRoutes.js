import express from "express"
import { protectedRoute } from "../Middlewares/protectedRoute.js"
import { getUserData } from "../Controllers/UserController.js";

const userRouter = express.Router()

userRouter.get("/get-user",protectedRoute,getUserData);

export default userRouter