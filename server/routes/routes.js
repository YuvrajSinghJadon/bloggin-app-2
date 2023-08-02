import express from "express";
import {
  createUser,
  logoutUser,
  loginUser,
} from "../controllers/userControllers.js";
import {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";

const router = express.Router();

//user routes
router.post("/login", loginUser);
router.post("/signup", createUser);
router.get("/logout", logoutUser);

//blog routes
router.post("/create", createPost);
router.get("/read:_id", getPost);
router.get("/posts", getAllPosts);
router.put("/update:_id", updatePost);
router.delete("/delete:_id", deletePost);

export default router;
