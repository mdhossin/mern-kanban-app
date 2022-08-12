import axiosClient from "./axiosClient";

const boardsApi = {
  create: () => axiosClient.post("/boards"),
  getAll: () => axiosClient.get("/boards"),
  updatePositoin: (params) => axiosClient.put("/boards", params),
  getOne: (id) => axiosClient.get(`/boards/${id}`),
  update: (id, params) => axiosClient.put(`/boards/${id}`, params),
  getFavourites: () => axiosClient.get("/boards/favourites"),
  updateFavouritePosition: (params) =>
    axiosClient.put("/boards/favourites", params),
};

export default boardsApi;
