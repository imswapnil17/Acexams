import express from "express"
import { getPapers } from "../Controllers/PaperController.js"
const paperRouter = express.Router()

paperRouter.get("/paper",getPapers)
export default paperRouter