import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponse } from '~/interfaces/types/response';
import { baseQueryWithReauth } from '../auth/auth.services';
import { TProductCategory } from '~/interfaces/types/product-category';

export const productCategoriesApi = createApi({
  reducerPath: 'productCategoriesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ProductCategories'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getProductCategories: builder.query<IResponse<TProductCategory[]>, void>({
      query: () => '/api/v1/product-categories',
      providesTags: ['ProductCategories'],
    }),

    getProductCategoryById: builder.query<IResponse<TProductCategory>, string>({
      query: (id) => `/api/v1/product-categories/${id}`,
      providesTags: ['ProductCategories'],
    }),

    createProductCategory: builder.mutation<IResponse<TProductCategory>, TProductCategory>({
      query: (productCategoryData) => ({
        url: '/api/v1/product-categories',
        method: 'POST',
        body: productCategoryData,
      }),
      invalidatesTags: ['ProductCategories'],
    }),

    updateProductCategory: builder.mutation<
      IResponse<TProductCategory>,
      { id: string; data: TProductCategory }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/product-categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ProductCategories'],
    }),

    deleteProductCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/product-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProductCategories'],
    }),
  }),
});

export const {
  useGetProductCategoriesQuery,
  useGetProductCategoryByIdQuery,
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productCategoriesApi;
