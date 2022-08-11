import axiosClient from "./axiosClient";

const boardsApi = {
  create: () => axiosClient.post("/boards"),
  getAll: () => axiosClient.get("/boards"),
  updatePositoin: (params) => axiosClient.put("/boards", params),
};

export default boardsApi;
