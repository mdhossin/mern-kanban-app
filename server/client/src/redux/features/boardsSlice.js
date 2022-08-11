import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBoards } = boardsSlice.actions;

export default boardsSlice.reducer;
