import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  }),

  tagTypes: ["Products", "Product"],

  endpoints: (builder) => ({

    getProducts: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return `/products?${params}`;
      },
      providesTags: ["Products"],
    }),

    getProductsByCategory: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        return `/products/category?${params}`;
      },
      providesTags: ["Products"],
    }),

    searchProducts: builder.query({
      query: (query) => `/products/search?query=${query}`,
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (res, err, id) => [{ type: "Product", id }],
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: `/products`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, updates }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (res, err, { id }) => [
        "Products",
        { type: "Product", id },
      ],
    }),

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
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
