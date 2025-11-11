import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Safe localStorage parsing
let storedUser = null;
try {
  const item = localStorage.getItem("userInfo");
  storedUser = item && item !== "undefined" ? JSON.parse(item) : null;
} catch (err) {
  console.error("Failed to parse userInfo from localStorage", err);
  storedUser = null;
}

// ✅ Login thunk
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Avatar update thunk
export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;
      if (!userInfo?.token) throw new Error("Not authorized");

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/auth/avatar",
        formData,
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Avatar update failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: storedUser },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        console.error("Avatar update failed:", action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error("Login failed:", action.payload);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
