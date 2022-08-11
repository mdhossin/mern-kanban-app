import axiosClient from "./axiosClient";

const boardsApi = {
  create: () => axiosClient.post("/boards"),
  getAll: () => axiosClient.get("/boards"),
};

export default boardsApi;
