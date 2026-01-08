import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponse } from '~/interfaces/types/response';
import { baseQueryWithReauth } from '../auth/auth.services';
import { TPostCategory } from '~/interfaces/types/post';

export const postCategoriesApi = createApi({
  reducerPath: 'postCategoriesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PostCategories'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getPostCategories: builder.query<IResponse<TPostCategory[]>, void>({
      query: () => '/api/v1/post-categories',
      providesTags: ['PostCategories'],
    }),

    getPostCategoryById: builder.query<IResponse<TPostCategory>, string>({
      query: (id) => `/api/v1/post-categories/${id}`,
      providesTags: ['PostCategories'],
    }),

    createPostCategory: builder.mutation<IResponse<TPostCategory>, TPostCategory>({
      query: (postCategoryData) => ({
        url: '/api/v1/post-categories',
        method: 'POST',
        body: postCategoryData,
      }),
      invalidatesTags: ['PostCategories'],
    }),

    updatePostCategory: builder.mutation<
      IResponse<TPostCategory>,
      { id: string; data: TPostCategory }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/post-categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PostCategories'],
    }),

    deletePostCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/post-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PostCategories'],
    }),
  }),
});

export const {
  useGetPostCategoriesQuery,
  useGetPostCategoryByIdQuery,
  useCreatePostCategoryMutation,
  useUpdatePostCategoryMutation,
  useDeletePostCategoryMutation,
} = postCategoriesApi;
