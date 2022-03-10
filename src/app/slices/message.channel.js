import { createSlice } from "@reduxjs/toolkit";
// import {
//   msgReaction,
//   msgAdd,
//   msgSetRead,
//   msgClearUnread,
//   msgUpdate,
//   msgDelete,
//   msgAddPending,
//   msgRemovePending,
//   msgReplacePending,
// } from "./message.handler";
const initialState = {};

const channelMsgSlice = createSlice({
  name: "channelMessage",
  initialState,
  reducers: {
    clearChannelMsg() {
      return initialState;
    },
    initChannelMsg(state, action) {
      return action.payload;
    },
    addChannelMsg(state, action) {
      const { id, mid } = action.payload;
      if (state[id]) {
        state[id].push(mid);
      } else {
        state[id] = [mid];
      }
    },
    deleteChannelMsg(state, action) {
      const { id, mid } = action.payload;
      if (state[id]) {
        delete state[id][mid];
      }
    },
    replaceChannelMsg(state, action) {
      const { id, local_mid, mid } = action.payload;
      const local_idx = state[id]?.findIndex((i) => i == local_mid);
      if (local_idx > -1) {
        state[id].splice(local_idx, 1, mid);
      }
    },

    // addChannelPendingMsg(state, action) {
    //   msgAddPending(state, action.payload);
    // },
    // replaceChannelPendingMsg(state, action) {
    //   msgReplacePending(state, action.payload);
    // },
    // removeChannelPendingMsg(state, action) {
    //   msgRemovePending(state, action.payload);
    // },
  },
});
export const {
  deleteChannelMsg,
  clearChannelMsg,
  replaceChannelMsg,
  initChannelMsg,
  // clearChannelMsgUnread,
  addChannelMsg,
  // addChannelPendingMsg,
  // replaceChannelPendingMsg,
  // removeChannelPendingMsg,
} = channelMsgSlice.actions;
export default channelMsgSlice.reducer;
