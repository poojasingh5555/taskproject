import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Auth headers automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (data) => API.post("/user/login", data);
export const register = (data) => API.post("/user/register", data);

// Tasks
export const getTasks = () => API.get("/task");
export const createTask = (data) => API.post("/task", data);
export const deleteTask = (id) => API.delete(`/task/${id}`);
export const updateTask = (id, data) => API.put(`/task/${id}`, data);