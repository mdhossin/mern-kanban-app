import axiosClient from "./axiosClient";

const authApi = {
  signup: (data) => axiosClient.post("/auth/signup", data),
  login: (data) => axiosClient.post("/auth/login", data),
  verifyToken: () => axiosClient.post("/auth/verify-token"),
};

export default authApi;
