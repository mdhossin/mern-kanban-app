import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/authSlice";
import boardsReducer from "./features/boardsSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
  },
});
