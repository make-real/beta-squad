import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    addSocket: (state, { payload }) => {
      state.socket = payload;
    },
  },
});

export const { addSocket } = socketSlice.actions;

export default socketSlice.reducer;
