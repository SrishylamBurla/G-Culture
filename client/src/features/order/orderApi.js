
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    prepareHeaders: (headers) => {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const token = JSON.parse(userInfo).token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Orders", "Order"],

  endpoints: (builder) => ({

    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    getMyOrders: builder.query({
      query: () => "/orders/myorders",
      providesTags: ["Orders"],
    }),

    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),

    updateOrderToPaid: builder.mutation({
      query: ({ id, payment }) => ({
        url: `/orders/${id}/pay`,
        method: "PUT",
        body: payment,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Orders",
        { type: "Order", id },
      ],
    }),

    updateOrderToDelivered: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        "Orders",
        { type: "Order", id },
      ],
    }),
    cancelOrder: builder.mutation({
  query: (id) => ({
    url: `/orders/${id}/cancel`,
    method: "PUT",
    body: {},
  }),
  invalidatesTags: ["Orders"],
}),

  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
  useCancelOrderMutation,
} = orderApi;
