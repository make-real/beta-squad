import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allList: [],
};


export const boardListsSlice = createSlice({
    name: "boardList",
    initialState,
    reducers: {
        getAllList: (state, { payload }) => {
            state.allList = [...payload];
        },
        addNewList: (state, { payload }) => {
            state.allList = [...state.allList, payload];
        },
    },
});


export const { getAllList, addNewList } = boardListsSlice.actions;

export default boardListsSlice.reducer;
