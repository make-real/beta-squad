import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedSpace: null,
    allSpaces: [],
};

export const spaceSlice = createSlice({
    name: "space",
    initialState,
    reducers: {
        addSpace: (state, { payload }) => {
            state.allSpaces = payload;
        },
        setSelectedSpaceId: (state, { payload }) => {
            state.selectedSpace = payload;
        },
        addNewSpace: (state, { payload }) => {
            state.allSpaces = [...state.allSpaces, payload];
        },
    },
});

export const { addSpace, setSelectedSpaceId, addNewSpace } = spaceSlice.actions;

export default spaceSlice.reducer;
