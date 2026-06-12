import {
  createTaskForUser,
  getUserTasks,
  updateTaskStatus,
  deleteUserTask,
} from "../service/taskService.js";
import StatusCodes from "http-status-codes";

export const createTaskController = async (req, res, next) => {
  try {
    const task = await createTaskForUser({
      ...req.body,
      userId: req.user.id,
    });
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasksController = async (req, res, next) => {
  try {
    const tasks = await getUserTasks(req.user.id, req.query.status);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatusController = async (req, res, next) => {
  try {
    const task = await updateTaskStatus(
      req.params.id,
      req.body.status,
      req.user.id,
    );
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const result = await deleteUserTask(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
