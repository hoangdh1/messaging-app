import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    getRealTimeMessages: (state, action) => {
      state.messages = action.payload;
    },
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
export const {
  getCurrentUser,
  getOnlineUsers,
  getRealTimeMessages,
  updateMessages,
} = actions;
export default userReducer;
