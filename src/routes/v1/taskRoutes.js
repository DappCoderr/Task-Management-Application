import { Router } from "express";
import { authenticate } from "../../middlewares/authMiddleware.js";
import {
  createTaskController,
  getTasksController,
  updateTaskStatusController,
  deleteTaskController,
} from "../../controller/taskController.js";

const router = Router();

router.post("/", authenticate, createTaskController);
router.get("/", authenticate, getTasksController);
router.put("/:id/status", authenticate, updateTaskStatusController);
router.delete("/:id", authenticate, deleteTaskController);

export default router;
