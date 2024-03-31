import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxios from "../../api";

export const getAllAiMessages = createAsyncThunk(
  "getAllAiMessages",
  async ({ spaceId }) => {
    try {
      const res = await useAxios.get(
        `/spaces/${spaceId}/ai-chat/get-messages?skip=0&limit=20`
      );

      if (res.data) {
        return res?.data?.data;
      }
    } catch (error) {
      if (error) {
        return error.response.data;
      }
    }
  }
);
export const AddAiMessage = createAsyncThunk(
  "AddAiMessage",
  async ({ spaceId,data }) => {
    try {
      const res = await useAxios.post(
        `/spaces/${spaceId}/ai-chat/save-message`,data
      );
      if (res.data) {
        return res.data.data;
      }
    } catch (error) {
      if (error) {
        return error.response.data;
      }
    }
  }
);
const initialState = {
  loading: false,
  AiMessages: [],
  error: "",
  isDepend: true,
  cardError: "",
};

export const AiMessageSlice = createSlice({
  name: "aiMessages",
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(getAllAiMessages.pending, (state, action) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(getAllAiMessages.fulfilled, (state, action) => {
        console.log(action.payload);
        state.AiMessages = action.payload;
        state.isDepend = !state.isDepend;
        state.loading = false;
      })
      .addCase(getAllAiMessages.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(AddAiMessage.pending, (state, action) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(AddAiMessage.fulfilled, (state, action) => {
        state.cardError = action.payload;
        state.AiMessages = [...state.AiMessages, action.payload];
        state.isDepend = !state.isDepend;
        state.loading = false;
      })
      .addCase(AddAiMessage.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default AiMessageSlice.reducer;
