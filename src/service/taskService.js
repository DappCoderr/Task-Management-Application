import taskRepository from "../repositories/taskRepository";

export const createTaskForUser = async ({ title, description, dueDate, priority, userId }) => {
  if (!title || !description) {
    throw new Error("Title and description are required");
  }
  return taskRepository.createTask({
    title,
    description,
    dueDate,
    priority,
    userId,
  });
};

export const getUserTasks = async (userId, statusFilter) => {
  const filters = statusFilter ? { status: statusFilter } : {};
  return taskRepository.findTasksByUser(userId, filters);
};

export const updateTaskStatus = async (taskId, newStatus, userId) => {
  const validStatuses = ["TODO", "IN PROGRESS", "COMPLETED"];
  if (!validStatuses.includes(newStatus)) {
    throw new Error("Invalid status");
  }
  const task = await taskRepository.findTaskById(taskId);
  if (!task) throw new Error("Task not found");
  if (task.userId !== userId) {
    throw new Error("You can only update your own tasks");
  }
  return taskRepository.updateTask(taskId, { status: newStatus });
};

export const deleteUserTask = async (taskId, userId) => {
  const task = await taskRepository.findTaskById(taskId);
  if (!task) throw new Error("Task not found");
  if (task.userId !== userId) {
    throw new Error("You can only delete your own tasks");
  }
  await taskRepository.deleteTask(taskId);
  return { message: "Task deleted" };
};