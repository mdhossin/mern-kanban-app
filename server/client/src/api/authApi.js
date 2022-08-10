import axiosClient from "./axiosClient";

const authApi = {
  signup: (data) => axiosClient.post("/signup", data),
  login: (data) => axiosClient.post("/login", data),
  verifyToken: () => axiosClient.post("/verify-token"),
};

export default authApi;
