import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uidFriend: null,
  currentUser: [],
  users: [],
  messages: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    getOnlineUsers: (state, action) => {
      state.users = action.payload;
    },
    setUidFriend: (state, action) => {
      state.uidFriend = action.payload;
    },
    getRealTimeMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
export const {
  getCurrentUser,
  getOnlineUsers,
  setUidFriend,
  getRealTimeMessages,
} = actions;
export default userReducer;
