import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allList: [],

};
console.log(initialState.allList);


export const boardListsCardsSlice = createSlice({
    name: "boardListsCards",
    initialState,
    reducers: {
        getAllList: (state, { payload }) => {
            state.allList = [...payload];
        },
        addNewList: (state, { payload }) => {
            state.allList = [...state.allList, payload];
        },
        // editList: (state, { payload }) => {
        //     state.allList = [...state.allList, payload];
        // },
        deleteList: (state, { payload }) => {
            state.allList = state.allList.filter(board => board._id !== payload);

        },


        addNewCard: (state, { payload }) => {
            // state.allList = [...state.allList, { ...state.allList.cards, payload }];
            state.allList = state.allList;
        },
        getAllCard: (state, { payload }) => {
            state.allList = [...payload];
        },
        editCard: (state, { payload }) => {
            state.allList = [...payload];
        },
        deleteCard: (state, { payload }) => {
            state.allList = [...payload];
        },
    },
});


export const { getAllList, addNewList, editList, deleteList, addNewCard, getAllCard, editCard, deleteCard } = boardListsCardsSlice.actions;

export default boardListsCardsSlice.reducer;


// 0:
// cards: Array(3)
// 0: {_id: '62fca383a18542465b9f959a', name: 'DEmo', progress: 0, tags: Array(0), spaceRef: '62f907144dadcb6265a3d701', …}
// 1: {_id: '62fca3a3a18542465b9f95a2', name: 'Get Work done', progress: 0, tags: Array(0), spaceRef: '62f907144dadcb6265a3d701', …}
// 2: {_id: '62fca5efa18542465b9f9708', name: 'JON DOE', progress: 0, tags: Array(0), spaceRef: '62f907144dadcb6265a3d701', …}
// name: "Swe"
// _id: "62f907194dadcb6265a3d713"