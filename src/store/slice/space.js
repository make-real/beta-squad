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
    updateSpace: (state, { payload }) => {
      const index = state.allSpaces.findIndex(
        (space) => space.id === payload.id
      );
      state.allSpaces[index] = payload;
    },
  },
});

export const { addSpace, setSelectedSpaceId, addNewSpace, updateSpace } = spaceSlice.actions;

export default spaceSlice.reducer;
