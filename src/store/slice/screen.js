import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullSidebar: true,
};

export const screen = createSlice({
    name: "screen",
    initialState,
    reducers: {
        toggleFullSidebar: (state, { payload }) => {
            state.fullSidebar = !state.fullSidebar;
        },
    },
});

export const { toggleFullSidebar } = screen.actions;

export default screen.reducer;
