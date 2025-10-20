import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth/auth.services';
import {
  IBlog,
  IBlogDetailResponse,
  IBlogsResponse,
} from '../../interfaces/types/blog/blog';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Blogs'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getBlogs: builder.query<IBlogsResponse, void>({
      query: () => '/api/v1/blogs',
      providesTags: ['Blogs'],
    }),

    getBlogById: builder.query<IBlogDetailResponse, string>({
      query: (id) => `/api/v1/blogs/${id}`,
      providesTags: ['Blogs'],
    }),

    createBlog: builder.mutation<IBlogDetailResponse, IBlog>({
      query: (blogData) => ({
        url: '/api/v1/blogs',
        method: 'POST',
        body: blogData,
      }),
      invalidatesTags: ['Blogs'],
    }),

    updateBlog: builder.mutation<
      IBlogDetailResponse,
      { id: string; data: IBlog }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/blogs/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Blogs'],
    }),

    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blogs'],
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
