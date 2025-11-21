import express from 'express';
import { createTask, deleteTask, editTask, getUserTasks } from '../controllers/task.controller.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

const router = express.Router();



router.post("/create", authenticateUser, createTask);

router.get("/get-tasks", authenticateUser, getUserTasks);

router.put("/edit/:id", authenticateUser, editTask);

router.delete("/delete/:id", authenticateUser, deleteTask);
export default router;