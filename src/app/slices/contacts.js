import { createSlice } from "@reduxjs/toolkit";
import { getNonNullValues } from "../../common/utils";
const initialState = {
  ids: [],
  byId: {},
};
const contactsSlice = createSlice({
  name: `contacts`,
  initialState,
  reducers: {
    clearContacts() {
      return initialState;
    },
    setContacts(state, action) {
      console.log("set Contacts store", state);
      const contacts = action.payload || [];
      state.ids = contacts.map(({ uid }) => uid);
      state.byId = Object.fromEntries(
        contacts.map((c) => {
          const { uid } = c;
          return [uid, c];
        })
      );
    },
    removeContact(state, action) {
      const uid = action.payload;
      state.ids = state.ids.filter((i) => i != uid);
      delete state.byId[uid];
    },
    updateUsersByLogs(state, action) {
      const changeLogs = action.payload;
      changeLogs.forEach(({ action, uid, ...rest }) => {
        switch (action) {
          case "update":
            {
              const vals = getNonNullValues(rest);
              if (state.byId[uid]) {
                Object.keys(vals).forEach((k) => {
                  state.byId[uid][k] = vals[k];
                });
              }
            }
            break;
          case "create":
            {
              state.ids.push(uid);
              state.byId[uid] = { uid, ...rest };
            }
            break;
          case "delete":
            {
              state.ids = state.ids.filter((i) => i != uid);
              delete state.byId[uid];
            }
            break;

          default:
            break;
        }
      });
    },
    updateUsersStatus(state, action) {
      const onlines = action.payload;
      onlines.forEach((item) => {
        const { uid, online = false } = item;

        // console.log("update user status", curr, online);
        if (state.byId[uid]) {
          state.byId[uid].online = online;
        }
      });
    },
  },
});
export const {
  clearContacts,
  setContacts,
  removeContact,
  updateUsersByLogs,
  updateUsersStatus,
} = contactsSlice.actions;
export default contactsSlice.reducer;
