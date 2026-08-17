import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,

    prepareHeaders: (headers) => {
      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
        const token = JSON.parse(userInfo).token;

        if (token) {
          headers.set(
            "Authorization",
            `Bearer ${token}`
          );
        }
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    createRazorpayOrder: builder.mutation({
      query: (orderId) => ({
        url: "/payments/create-order",
        method: "POST",
        body: {
          orderId,
        },
      }),
    }),

    verifyRazorpayPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments/verify",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const {
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
} = paymentApi;