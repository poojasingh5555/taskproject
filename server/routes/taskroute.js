import express from "express"
import {createTask,getTasks,updateTask,deleteTask} from "../controllers/taskcontroller.js"
import {authMiddleware} from "../middleware/authmiddleware.js"


const router = express.Router()

router.post("/",authMiddleware,createTask)

router.get("/",authMiddleware,getTasks)
router.put('/:id',authMiddleware,updateTask)
router.delete("/:id",authMiddleware,deleteTask)

export default router