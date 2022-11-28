import { createSlice } from "@reduxjs/toolkit";

export const filterStatus = {
  incomplete: 0,
  inprogress: -1,
  complete: 4,
};

const initialState = {
  filterObject: [
    {
      parent: "status",
      multiselect: false,
      options: [
        { label: "All task", value: "all" },
        { label: "Incomplete", value: "incomplete" },
        { label: "Inprogress", value: "inprogress" },
        { label: "Complete", value: "complete" },
      ],
    },
    {
      parent: "assignee",
      multiselect: true,
      options: [],
    },
    {
      parent: "tags",
      multiselect: true,
      options: [],
    },
  ],
  filter: {
    status: "all",
    assignee: [],
    tags: [],
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardFilter: (state, { payload }) => {
      state.filter = payload;
    },
    setAssignedFilter: (state, { payload }) => {
      const index = state.filterObject.findIndex(
        (item) => item.parent === "assignee"
      );
      state.filterObject[index].options = payload.map((user) => ({
        label: user.fullName,
        value: user._id,
      }));
    },
    setTagFilter: (state, { payload }) => {
      const index = state.filterObject.findIndex(
        (item) => item.parent === "tags"
      );
      state.filterObject[index].options = payload.map((tag) => ({
        tag: {
          name: tag.name,
          color: tag.color,
        },
        value: tag._id,
      }));
    },
    clearFilterState: (state) => {
      state.filter = initialState.filter;
    },
  },
});

export const { setBoardFilter, setAssignedFilter, setTagFilter, clearFilterState } =
  boardSlice.actions;

export default boardSlice.reducer;
