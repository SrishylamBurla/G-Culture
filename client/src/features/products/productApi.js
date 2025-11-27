import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.userInfo?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Products", "Product"],

  endpoints: (builder) => ({
    // GET ALL PRODUCTS (ADMIN + PUBLIC)
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    // GET PRODUCTS WITH FILTERS
    getProducts: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return `/products?${params}`;
      },
      providesTags: ["Products"],
    }),

    // GET PRODUCTS BY CATEGORY
    getProductsByCategory: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return `/products/category?${params}`;
      },
      providesTags: ["Products"],
    }),
    // FEATUERED PRODUCTS
    getFeaturedProducts: builder.query({
      query: () => `/products/featured`,
      providesTags: ["Products"],
    }),
    // LATEST PRODUCTS
    getLatestProducts: builder.query({
      query: () => `/products/latest`,
      providesTags: ["Products"],
    }),

    // SEARCH
    searchProducts: builder.query({
      query: (query) => `/products/search?query=${query}`,
      providesTags: ["Products"],
    }),

    // GET SINGLE PRODUCT
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (res, err, id) => [{ type: "Product", id }],
    }),

    // CREATE PRODUCT (ADMIN)
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `/products`,
        method: "POST",
        body: productData, // For FormData no headers needed
      }),
      invalidatesTags: ["Products"],
    }),

    // UPDATE PRODUCT (ADMIN)
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (res, err, { id }) => [
        "Products",
        { type: "Product", id },
      ],
    }),

    createReview: builder.mutation({
      query: ({ productId, rating, comment }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body: { rating, comment },
      }),
    }),

    // DELETE PRODUCT (ADMIN)
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetFeaturedProductsQuery,
  useGetLatestProductsQuery,
  useCreateReviewMutation
} = productApi;
