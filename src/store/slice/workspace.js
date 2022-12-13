import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedWorkspace: null,
    workspaces: [],
    currentWorkspace: null,
    workspaceMembers: [],
};

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        addWorkSpace: (state, { payload }) => {
            state.workspaces = payload;
        },
        addWorkspaceMembers: (state, { payload }) => {
            state.workspaceMembers = payload;
        },
        setSelectedWorkSpaceId: (state, { payload }) => {
            state.selectedWorkspace = payload;
            state.currentWorkspace = state.workspaces.filter((workspace) => {
                return workspace._id === payload;
            })[0];
        },
        removeWorkspace: (state, { payload }) => {
            state.workspaces = state.workspaces.filter(
                ({ _id }) => _id !== payload
            );
        },
        updateWorkspace: (state, { payload }) => {
            state.workspaces = state.workspaces.map((workspace) =>
                workspace._id === payload._id ? payload : workspace
            );
        },
    },
});

export const {
    addWorkSpace,
    setSelectedWorkSpaceId,
    removeWorkspace,
    updateWorkspace,
    addWorkspaceMembers,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
