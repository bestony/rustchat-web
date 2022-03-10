import { createSlice } from "@reduxjs/toolkit";
import { KEY_AFTER_MID, KEY_USER_VERSION, KEY_UID } from "../config";
const initialState = {
  usersVersion: null,
  afterMid: null,
};
const visitMarkSlice = createSlice({
  name: "visitMark",
  initialState,
  reducers: {
    clearMark() {
      return initialState;
    },
    setMark(state, action) {
      const mark = action.payload;
      return mark;
    },
    setUsersVersion(state, action) {
      const { version } = action.payload;
      state.usersVersion = version;
      // const curr_uid = localStorage.getItem(KEY_UID);
      // localStorage.setItem(`${KEY_USER_VERSION}_${curr_uid}`, version);
    },
    setAfterMid(state, action) {
      const { mid } = action.payload;
      state.afterMid = mid;
      // const curr_uid = localStorage.getItem(KEY_UID);
      // localStorage.setItem(`${KEY_AFTER_MID}_${curr_uid}`, mid);
    },
  },
});
export const {
  setMark,
  setUsersVersion,
  setAfterMid,
  clearMark,
} = visitMarkSlice.actions;
export default visitMarkSlice.reducer;
