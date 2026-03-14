import express from "express"
import { signup } from "../Controllers/AuthController.js"

const authRouter  = express.Router()

authRouter.post('/sign-up',signup)

export default authRouter

