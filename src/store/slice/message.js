import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addBulkMessage: (state, { payload }) => {
      state.messages = payload;
    },
    addSingleMessage: (state, { payload }) => {
      state.messages.push(payload);
    }
  },
});

export const { addBulkMessage, addSingleMessage } = messageSlice.actions;

export default messageSlice.reducer;
