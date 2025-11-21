// src/features/user/userApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.userInfo?.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["User"],
    }),

    // REGISTER
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { name, email, password },
        headers: { "Content-Type": "application/json" },
      }),
    }),

    // UPDATE NAME  ✅ FIXED
    updateName: builder.mutation({
      query: ({ name }) => ({
        url: "/auth/update-name",
        method: "PUT",
        body: { name },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["User"],
    }),

    // UPDATE PASSWORD
    updatePassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: "/auth/update-password",
        method: "PUT",
        body: { currentPassword, newPassword },
        headers: { "Content-Type": "application/json" },
      }),
    }),
    
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    // UPDATE AVATAR (multipart/form-data)
    updateAvatar: builder.mutation({
      query: (formData) => ({
        url: "/auth/update-avatar",
        method: "PUT",
        body: formData,
        // ❌ DO NOT add headers here — browser sets it automatically for FormData
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateNameMutation,
  useGetAllUsersQuery,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
} = userApi;
