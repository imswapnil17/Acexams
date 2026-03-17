import express, { Router } from "express"
import { login, signup, logout } from "../Controllers/AuthController.js"
import { protectedRoute } from "../Middlewares/protectedRoute.js";

const authRouter = express.Router()

authRouter.post("/sign-up",signup);
authRouter.post("/login",login);
authRouter.post("/logout",protectedRoute,logout)

export default authRouter