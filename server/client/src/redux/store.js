import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/authSlice";
import boardsReducer from "./features/boardsSlice";
import favouriteReducer from "./features/favouriteSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
    favourites: favouriteReducer,
  },
});
