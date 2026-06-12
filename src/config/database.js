import Sequlize from "sequelize";
import { DATABASE_URL } from "./serverConfig.js";

export const sequelize = new Sequlize(DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
