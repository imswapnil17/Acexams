import express from "express"
import path from "path"
import cookieParser from "cookie-parser"

import { connectDB } from "./config/db.js"
import { ENV_VARS } from "./config/config.js"
import authRouter from "./Routes/AuthRoutes.js"
import userRouter from "./routes/userRoutes.js"
import taskRouter from "./routes/taskRoutes.js"
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/task",taskRouter)

app.listen(ENV_VARS.PORT, () => {
    console.log("server is live at http://localhost:" + ENV_VARS.PORT);
    connectDB()
})