import axios from "axios";
// import { getAccessToken } from "../utils/common-utils";

const API_URL = "http://localhost:3000";

//create user
export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, user);
    return response.data;
  } catch (error) {
    console.error("Error siginingUp:", error);
  }
};
//login user
export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);
    return response;
  } catch (error) {
    console.error("Error loggingUp:", error);
  }
};
//logout user
export const logoutUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/logout`, {
      headers: { authorization: getAccessToken() },
    });
    return response;
  } catch (error) {
    console.error("Error loggingOut:", error);
  }
};
//Create post
export const createPost = async (post) => {
  try {
    const response = await axios.post(`${API_URL}/create`, post, {
      // headers: { authorization: getAccessToken() },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
//get post
export const getPostByid = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/read/${id}`, {
      // headers: { authorization: getAccessToken() },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting post:", error);
  }
};
//delete post
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      // headers: { authorization: getAccessToken() },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
//getAllPosts
export const getAllPosts = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting all posts:", error);
  }
};
//comments
export const newComment = async (comment) => {
  try {
    const response = await axios.post(`${API_URL}/createComment`, comment);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};
export const getAllComments = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/comments/${id}`);
    console.log("comments form index.js", response);
    return response.data;
  } catch (error) {
    console.error("Error getting comments:", error);
  }
};
export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteComment/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
