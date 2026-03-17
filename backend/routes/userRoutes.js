import express, { Router } from "express"
import { getUserData,updateUser,deleteUser } from "../Controllers/UserController.js"

const userRouter = express.Router()

userRouter.get("/get-user",getUserData);
userRouter.put('/update-user',updateUser)
userRouter.delete("/delete-user",deleteUser)
export default userRouter;