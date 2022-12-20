import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullSidebar: true,
};

export const screen = createSlice({
    name: "screen",
    initialState,
    reducers: {
        toggleFullSidebar: (state, { payload }) => {
            localStorage.setItem(
                "fullSidebar",
                !state.fullSidebar ? "show" : "hide"
            );
            state.fullSidebar = !state.fullSidebar;
        },
        initFullSidebar: (state, action) => {
            state.fullSidebar = localStorage.getItem("fullSidebar") === "show";
        },
    },
});

export const { toggleFullSidebar, initFullSidebar } = screen.actions;

export default screen.reducer;
