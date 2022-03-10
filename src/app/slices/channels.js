import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ids: [],
  byId: {},
};
const channelsSlice = createSlice({
  name: `channels`,
  initialState,
  reducers: {
    clearChannels() {
      return initialState;
    },
    setChannels(state, action) {
      console.log("set channels store", state);
      const chs = action.payload || [];
      state.ids = chs.map(({ gid }) => gid);
      state.byId = Object.fromEntries(
        chs.map((c) => {
          const { gid } = c;
          return [gid, c];
        })
      );
    },

    updateChannel(state, action) {
      // console.log("set channels store", action);
      const { id, name, description } = action.payload;
      const oObj = state.byId[id];
      const newObj = { ...oObj, name, description };
      state.byId[id] = newObj;
    },
    addChannel(state, action) {
      // console.log("set channels store", action);
      const ch = action.payload;
      const { gid, ...rest } = ch;
      state.ids.push(gid);
      state.byId[gid] = rest;
    },
    deleteChannel(state, action) {
      const gid = action.payload;
      state.ids = state.ids.filter((i) => i != gid);
      delete state.byId[gid];
    },
    // clearAuthData(state) {
    //   console.log("clear auth data");
    //   state.user = null;
    //   state.token = null;
    //   state.refreshToken = null;
    // },
  },
});
export const {
  clearChannels,
  setChannels,
  addChannel,
  deleteChannel,
  updateChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
