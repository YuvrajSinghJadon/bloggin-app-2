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
//Create blog
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
//
