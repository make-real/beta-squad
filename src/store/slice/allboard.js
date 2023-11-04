import { createSlice } from "@reduxjs/toolkit";
import { DeleteCard, UpdatedCard, addCard, getAllListCards } from "../../api/board";

const initialState = {
  loading: false,
  data: [],
  error: "",
  filterBoardLists: [],
  IsDispatch:true,
};

export const cardsLists = createSlice({
  name: "allBoard",
  initialState,
  reducers: {
    setFilterListBoard: (state, action) => {
      state.filterBoardLists = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllListCards.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllListCards.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(getAllListCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(addCard.pending, (state, action) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        // const { cardObj, bid } = action.payload
        // const data = state.data
        // const boardIndex = data.findIndex(({ _id }) => _id === bid);
        // if (boardIndex >= 0) {
        //   if (!state.data[boardIndex].cards) {
        //     state.data[boardIndex].cards = [];
        //   }
        //   state.data[boardIndex].cards.push(cardObj);
        // }
        state.IsDispatch= !state.IsDispatch
        state.loading = false;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })



      .addCase(DeleteCard.pending, (state, action) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(DeleteCard.fulfilled, (state, action) => {
        state.IsDispatch= !state.IsDispatch
        // const boardIndex = state.data.findIndex(({ _id }) => _id === action.payload.bid);
        // if (boardIndex < 0) return;
        // const cardIndex = state.data[boardIndex].cards.findIndex(
        //   ({ _id }) => _id === action.payload.cid
        // );
        // if (cardIndex < 0) return
        // const tempBoard = [...state.data];
        // tempBoard[boardIndex].cards.splice(cardIndex, 1);
      })
      .addCase(DeleteCard.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })



      .addCase(UpdatedCard.pending, (state, action) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(UpdatedCard.fulfilled, (state, action) => {
        state.IsDispatch= !state.IsDispatch
      
      })
      .addCase(UpdatedCard.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export const { setFilterListBoard,} = cardsLists.actions;
export default cardsLists.reducer;
