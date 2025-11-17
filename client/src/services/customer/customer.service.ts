import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponse } from '~/interfaces/types/response';
import { baseQueryWithReauth } from '../auth/auth.services';
import { ICustomer } from '~/interfaces/types/user';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Customers', 'User'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getCustomer: builder.query<IResponse<ICustomer[]>, void>({
      query: () => '/api/v1/customers',
      providesTags: ['Customers'],
    }),

    getCustomerById: builder.query<IResponse<ICustomer>, string>({
      query: (id) => `/api/v1/customers/${id}`,
      providesTags: ['Customers'],
    }),

    createCustomer: builder.mutation<IResponse<ICustomer>, ICustomer>({
      query: (productCategoryData) => ({
        url: '/api/v1/customers',
        method: 'POST',
        body: productCategoryData,
      }),
      invalidatesTags: ['Customers'],
    }),

    updateCustomer: builder.mutation<
      IResponse<ICustomer>,
      { id: string; data: Partial<ICustomer> }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/customers/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Customers', 'User'],
    }),
    updateAvatarCustomer: builder.mutation<
      IResponse<ICustomer>,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/customers/${id}/avatar`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Customers', 'User'],
    }),
  }),
});

export const {
  useGetCustomerQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useUpdateAvatarCustomerMutation
} = customerApi;