import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
