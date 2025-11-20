// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

let storedUser = null;
try {
  storedUser = JSON.parse(localStorage.getItem("userInfo")) || null;
} catch {
  storedUser = null;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: storedUser,
  },

  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
