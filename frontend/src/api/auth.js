import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/accounts",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/register/", data);
export const loginUser = (data) => API.post("/token/", data);
export const getProfile = () => API.get("/profile/");
