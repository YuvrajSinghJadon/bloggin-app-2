import express from "express";
import {
  createUser,
  logoutUser,
  loginUser,
} from "../controllers/userControllers.js";

const router = express.Router();

//user routes
router.post("/login", loginUser);
router.post("/signup", createUser);
router.get("/logout", logoutUser);

export default router;
