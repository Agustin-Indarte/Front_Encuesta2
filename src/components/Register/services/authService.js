import axios from "axios";

const API = "http://localhost:4000/api/v1";

const getToken = () => localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (userData) => {
  const res = await axiosInstance.post("/register", userData);
  return res.data;
};

export const login = async (data) => {
  const res = await axiosInstance.post("/login", data);
  return {
    token: res.data.token,
    user: {
      id: res.data.id,
      username: res.data.username,
      email: res.data.email,
      profileImage: res.data.profileImage,
    },
  };
};

export const verifyToken = async () => {
  try {
    const res = await axiosInstance.get("/verify-token");
    return res.status === 200;
  } catch {
    return false;
  }
};

export const profile = async () => {
  const res = await axiosInstance.get("/profile");
  return res.data;
};
