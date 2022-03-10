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
  name: "reactionMessage",
  initialState,
  reducers: {
    // todo
    reactMsg(state, action) {
      const { from_uid, mid, action: reaction } = action.payload;
      console.log("msg reaction: likes", mid, from_uid, reaction);
      if (state[mid]) {
        if (!state[mid].likes) {
          console.log("msg reaction: initial ");
          state[mid].likes = {};
        }
        const currLikes = state[mid].likes;
        // state[id][mid].likes = currLikes ? [...currLikes, reaction] : [reaction];
        if (currLikes[reaction]) {
          if (currLikes[reaction].includes(from_uid)) {
            const idx = currLikes[reaction].findIndex((id) => {
              return id == from_uid;
            });
            console.log("remove reaction", currLikes[reaction], idx, from_uid);
            currLikes[reaction].splice(idx, 1);
          } else {
            currLikes[reaction].push(from_uid);
          }
        } else {
          currLikes[reaction] = [from_uid];
        }
        // state[id][mid].likes = currLikes;
      }
    },
  },
});
export const { reactMsg } = channelMsgSlice.actions;
// export  channelMsgSlice.actions;
export default channelMsgSlice.reducer;
