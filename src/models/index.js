import { Task } from "./Task.js";
import { User } from "./user.js";

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });
