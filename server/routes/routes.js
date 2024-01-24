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
import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

//user routes
router.post("/login", loginUser);
router.post("/signup", createUser);
router.get("/logout", logoutUser);

//blog routes
router.post("/create", createPost);
router.get("/read/:id", getPost);
router.get("/posts", getAllPosts);
router.put("/update:id", updatePost);
router.delete("/delete:id", deletePost);

//create comment
router.post("/createComment", createComment);
router.get("/comments/:id", getComments);
export default router;

//delete comment
router.delete("/deleteComment/:id", deleteComment);
