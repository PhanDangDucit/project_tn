import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponse } from '~/interfaces/types/response';
import { baseQueryWithReauth } from '../auth/auth.services';
import { TProduct } from '~/interfaces/types/product';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Customers'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getCustomer: builder.query<IResponse<TProduct[]>, void>({
      query: () => '/api/v1/customers',
      providesTags: ['Customers'],
    }),

    getCustomerById: builder.query<IResponse<TProduct>, string>({
      query: (id) => `/api/v1/customers/${id}`,
      providesTags: ['Customers'],
    }),

    createCustomer: builder.mutation<IResponse<TProduct>, TProduct>({
      query: (productCategoryData) => ({
        url: '/api/v1/customers',
        method: 'POST',
        body: productCategoryData,
      }),
      invalidatesTags: ['Customers'],
    }),

    updateCustomer: builder.mutation<
      IResponse<TProduct>,
      { id: string; data: TProduct }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/customers/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
});

export const {
  useGetCustomerQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;