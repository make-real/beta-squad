import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterObject: [
    {
      parent: "status",
      multiselect: false,
      options: [
        { label: "All task", value: "all" },
        { label: "Incomplete", value: "incomplete" },
        { label: "Complete", value: "complete" },
        { label: "Archive", value: "archive" },
      ],
    },
    {
      parent: "assignee",
      multiselect: true,
      options: [
        { label: "Zahin", value: "45r635635f3356r" },
        { label: "Tasin Mir", value: "34r63456345345r3" },
        { label: "Mahabub", value: "345f4534f345dy4" },
        { label: "Taiseen", value: "3f4534f7345743f5" },
        { label: "Unassigned", value: "unassigned" },
      ],
    },
    {
      parent: "tag",
      multiselect: true,
      options: [
        {
          tag: {
            name: "In Progress",
            color: "orange",
          },
          value: "progress",
        },
        {
          tag: {
            name: "Done",
            color: "green",
          },
          value: "done",
        },
        {
          tag: {
            name: "Issue",
            color: "red",
          },
          value: "issue",
        },
      ],
    },
  ],
  filter: {
    status: "all",
    assignee: [],
    tag: [],
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { setBoardFilter } = boardSlice.actions;

export default boardSlice.reducer;
