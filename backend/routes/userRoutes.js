import express, { Router } from "express"
import { getUserData } from "../Controllers/UserController.js"

const userRouter = express.Router()

userRouter.get("/get-user",getUserData);

export default userRouter;