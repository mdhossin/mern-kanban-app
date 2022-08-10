import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/authSlice";
export default configureStore({
  reducer: {
    user: userReducer,
  },
});
