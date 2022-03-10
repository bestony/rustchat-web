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

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMsg(state, action) {
      const {
        content,
        created_at,
        mid,
        reply_mid = null,
        from_uid,
        content_type,
      } = action.payload;
      const newMsg = {
        content,
        content_type,
        created_at,
        from_uid,
        unread: state[mid] ? false : true,
        reply_mid,
      };
      state[mid] = newMsg;
    },
    deleteMsg(state, action) {
      const mid = action.payload;
      delete state[mid];
    },
    updateMsg(state, action) {
      const { mid, content, time } = action.payload;
      console.log("update message", mid);
      if (state[mid]) {
        state[mid].content = content;
        state[mid].edited = time;
      }
    },
    // likeMsg(state, action) {
    //   msgReaction(state, action.payload);
    // },
    setMsgRead(state, action) {
      const mids = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      console.log("set read", mids);
      mids.forEach((id) => {
        if (state[id]) {
          state[id].unread = false;
        }
      });
    },
  },
});
export const {
  addMsg,
  deleteMsg,
  updateMsg,
  setMsgRead,
} = messageSlice.actions;
export default messageSlice.reducer;
