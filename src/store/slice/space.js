import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    selectedSpace: null,
    selectedSpaceObj: {},
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
        setSelectedSpaceObject: (state, { payload }) => {
            state.selectedSpaceObj = payload;
        },
        addNewSpace: (state, { payload }) => {
            state.allSpaces = [...state.allSpaces, payload];
        },
    },
});


export const { addSpace, setSelectedSpaceId, addNewSpace, setSelectedSpaceObject } = spaceSlice.actions;

export default spaceSlice.reducer;