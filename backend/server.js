import express from "express"
import path from "path"
import cookieParser from "cookie-parser"

import { connectDB } from "./config/db.js"
import { ENV_VARS } from "./config/config.js"
import authRouter from "./Routes/AuthRoutes.js"
import userRouter from "./routes/userRoutes.js"
import taskRouter from "./routes/taskRoutes.js"
import paperRouter from "./routes/paperRoutes.js"
import { protectedRoute } from "./Middlewares/protectedRoute.js"
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user",protectedRoute, userRouter)
app.use("/api/v1/task",protectedRoute,taskRouter)
app.use("/api/v1/paper",paperRouter)

app.listen(ENV_VARS.PORT, () => {
    console.log("server is live at http://localhost:" + ENV_VARS.PORT);
    connectDB()
})