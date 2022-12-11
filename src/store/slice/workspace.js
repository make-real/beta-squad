import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedWorkspace: null,
    workspaces: [],
    currentWorkspace: null,
};

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        addWorkSpace: (state, { payload }) => {
            state.workspaces = payload;
        },
        setSelectedWorkSpaceId: (state, { payload }) => {
            state.selectedWorkspace = payload;
            state.currentWorkspace = state.workspaces.filter((workspace) => {
                return workspace._id === payload;
            })[0];
        },
    },
});

export const { addWorkSpace, setSelectedWorkSpaceId } = workspaceSlice.actions;

export default workspaceSlice.reducer;
