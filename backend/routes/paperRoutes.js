import express from "express"
import { getPaperPDF, getPYPs, getSubjects } from "../Controllers/paperController.js"
import { protectedRoute } from "../Middlewares/protectedRoute.js"
const paperRouter = express.Router()

paperRouter.get("/get-subjects/:subclass",getSubjects)
paperRouter.get("/get-papers/:class/:uid/:id",protectedRoute,getPYPs)
paperRouter.get("/get-pdf/:class/:uid/:paper/:id",protectedRoute,getPaperPDF)
export default paperRouter