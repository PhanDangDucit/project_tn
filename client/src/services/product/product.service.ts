import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponse } from '~/interfaces/types/response';
import { baseQueryWithReauth } from '../auth/auth.services';
import { TProduct } from '~/interfaces/types/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getProduct: builder.query<IResponse<TProduct[]>, void>({
      query: () => '/api/v1/products',
      providesTags: ['Products'],
    }),

    getProductSearch: builder.query<IResponse<TProduct[]>, string | void>({
      query: (keyword) => {
        const q = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
        return `/api/v1/products/search${q}`;
      },
      // providesTags: ['Products'],
    }),

    getProductById: builder.query<IResponse<TProduct>, string>({
      query: (id) => `/api/v1/products/${id}`,
      providesTags: ['Products'],
    }),

    createProduct: builder.mutation<IResponse<TProduct>, TProduct>({
      query: (productCategoryData) => ({
        url: '/api/v1/products',
        method: 'POST',
        body: productCategoryData,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation<
      IResponse<TProduct>,
      { id: string; data: TProduct }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductSearchQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;