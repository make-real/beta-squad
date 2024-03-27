import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from ".";
import Message from "./../assets/icons/svg/Message";

export const getAllListCards = createAsyncThunk(
  "getAllListCards/allboard",
  async (squadId) => {
    try {
      const res = await useAxios.get(`/spaces/${squadId}/board?getCards=true`);
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      if (error) {
        return error.response.data;
      }
    }
  }
);
export  const createAiCard = createAsyncThunk(
  "getAllListCards/createAiCard",
  async ({spaceId, listId,data}) => {
    try {
      const res = await useAxios.post(
        `/spaces/${spaceId}/board/${listId}/card-ai`,data
      );
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      if (error) {
        return error.response.data;
      }
    }
  }
);

export const addCard = createAsyncThunk(
  "addCard/allboard",
  async ({ spaceId, listId, newCard }) => {
    try {
      const res = await useAxios.post(
        `/spaces/${spaceId}/board/${listId}/card`,
        newCard
      );
      if (res.data) {
        console.log(res.data);
        return res.data;
      }
    } catch (error) {
      console.log(error);
      if (error) {
        return error.Message;
      }
    }
  }
);

export const DeleteCard = createAsyncThunk(
  "deleteCard/allboard",
  async ({ spaceId, listId, cardId }) => {
    try {
      const res = await useAxios.delete(
        `/spaces/${spaceId}/board/${listId}/card/${cardId}`
      );
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      if (error) {
        return error.response.data;
      }
    }
  }
);
export const UpdatedCard = createAsyncThunk(
  "UpdatedCard/allboard",
  async ({ spaceId, listId, cardId, cardObj }) => {
    try {
      const res = await useAxios.patch(
        `/spaces/${spaceId}/board/${listId}/card/${cardId}`,
        cardObj
      );
      if (res.data) {
        return res.data;
      }
    } catch (error) {
      if (error) {
        return error.response.data;
      }
    }
  }
);

// export const deleteCard = createAsyncThunk(
//   "allBoard/updateListsCard",
//   async (spaceId, listId) => {
//     try {
//       const res = await useAxios.delete(`/spaces/${spaceId}/board/${listId}`)
//       if (res.data) {
//         return res.data;
//       }
//     } catch (error) {
//       if (error) {
//         return error.response.data;
//       }
//     }
//   }
// );
