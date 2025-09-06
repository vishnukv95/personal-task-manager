import express from "express"

import { authenticate } from "../middlewares/authMiddleware.js"
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js"

const taskRouter = express.Router()

taskRouter.use(authenticate)

taskRouter.get('/',getTasks)
taskRouter.post('/',addTask)
taskRouter.patch('/:id',updateTask)
taskRouter.delete('/:id',deleteTask)

export default taskRouter