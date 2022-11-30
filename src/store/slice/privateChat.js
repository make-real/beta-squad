import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const privateChatSlice = createSlice({
  name: "SingleChat",
  initialState,
  reducers: {
    addBulkMessagePrivate: (state, { payload }) => {
      state.messages = payload;
    },
    addSingleMessagePrivate: (state, { payload }) => {
      state.messages.push(payload);
    },
    removeMessagePrivate: (state, { payload }) => {
      state.messages = state.messages.filter((m) => m._id !== payload);
    },
    addReactionPrivate: (state, { payload }) => {
      state.messages = state.messages.map((m) => {
        if (m._id === payload.messageId) {
          let reactionChanged = false;

          m.reactions = m.reactions.map((r) => {
            if (r.reactor?._id === payload.react.reactor?._id) {
              r.reaction = payload.react.reaction;
              reactionChanged = true;
            }

            return r;
          });

          if (!reactionChanged) {
            m.reactions.push(payload.react);
          }
        }
        return m;
      });
    },
  },
});

export const {
  addBulkMessagePrivate,
  addSingleMessagePrivate,
  addReactionPrivate,
  removeMessagePrivate,
} = privateChatSlice.actions;

export default privateChatSlice.reducer;
