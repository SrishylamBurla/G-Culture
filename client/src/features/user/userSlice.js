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

// ---------------------------------------------
// LOGIN THUNK
// ---------------------------------------------
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
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

// ---------------------------------------------
// AVATAR UPDATE THUNK (FIXED URL)
// ---------------------------------------------
export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;

      if (!userInfo?.token) return rejectWithValue("Unauthorized");

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/update-avatar`,   
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Avatar update failed"
      );
    }
  }
);

export const updateName = createAsyncThunk(
  "user/updateName",
  async (name, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/update-name`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Name update failed");
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/update-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Password update failed");
    }
  }
);


// ---------------------------------------------
// SLICE
// ---------------------------------------------
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
      })
      .addCase(updateName.fulfilled, (state, action) => {
  state.userInfo = action.payload;
})
.addCase(updateName.rejected, (state, action) => {
  console.error(action.payload);
})

.addCase(updatePassword.fulfilled, () => {
  console.log("Password updated successfully");
})
.addCase(updatePassword.rejected, (state, action) => {
  console.error(action.payload);
});

  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
