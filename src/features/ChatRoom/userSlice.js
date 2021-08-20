import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  messages: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getOnlineUsers: (state, action) => {
      state.users = action.payload;
    },
    getRealTimeMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
export const { getOnlineUsers, getRealTimeMessages } = actions;
export default userReducer;
