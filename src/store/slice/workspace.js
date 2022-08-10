import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedWorkspace: null,
  workspaces: [],
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    addWorkSpace: (state, { payload }) => {
      return state.workspaces.push(payload);
    },
  },
});

export const { addWorkSpace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
