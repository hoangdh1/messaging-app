import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/ChatRoom/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
