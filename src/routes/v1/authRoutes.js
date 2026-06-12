import { Router } from "express";
import {
  registerAuth,
  login,
  refresh,
  logout,
} from "../../controller/authController.js";

const router = Router();

router.post("/register", registerAuth);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
