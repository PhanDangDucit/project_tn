import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth/auth.services';
import { IResponse } from '~/interfaces/types/response';
import { TPost } from '~/interfaces/types/post';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['News'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getBlogs: builder.query<IResponse<TPost[]>, void>({
      query: () => '/api/v1/posts',
      providesTags: ['News'],
    }),

    getBlogById: builder.query<IResponse<TPost>, string>({
      query: (id) => `/api/v1/posts/${id}`,
      providesTags: ['News'],
    }),

    createBlog: builder.mutation<IResponse<TPost>, TPost>({
      query: (blogData) => ({
        url: '/api/v1/posts',
        method: 'POST',
        body: blogData,
      }),
      invalidatesTags: ['News'],
    }),

    updateBlog: builder.mutation<
      IResponse<TPost>,
      { id: string; data: TPost }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/news/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['News'],
    }),

    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/news/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['News'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
