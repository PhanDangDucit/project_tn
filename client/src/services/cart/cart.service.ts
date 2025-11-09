import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponse } from '~/interfaces/types/response';
import { baseQueryWithReauth } from '../auth/auth.services';
import { TCartDetail } from '~/interfaces/types/cart-detail';

export const cartDetailApi = createApi({
  reducerPath: 'cartDetailApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['CartDetails'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getCartDetails: builder.query<IResponse<TCartDetail[]>, void>({
      query: () => '/api/v1/cart-details',
      providesTags: ['CartDetails'],
    }),

    getCartDetailById: builder.query<IResponse<TCartDetail>, string>({
      query: (id) => `/api/v1/cart-details/${id}`,
      providesTags: ['CartDetails'],
    }),
    
    getCartDetailByCustomerId: builder.query<IResponse<TCartDetail[]>, string>({
      query: (id) => `/api/v1/cart-details/customers/${id}`,
      providesTags: ['CartDetails'],
    }),

    createCartDetail: builder.mutation<IResponse<TCartDetail>, TCartDetail>({
      query: (cartDetailData) => ({
        url: '/api/v1/cart-details',
        method: 'POST',
        body: cartDetailData,
      }),
      invalidatesTags: ['CartDetails'],
    }),

    updateCartDetail: builder.mutation<
      IResponse<TCartDetail>,
      { id: string; data: TCartDetail }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/cart-details/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CartDetails'],
    }),

    deleteCartDetail: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/cart-details/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CartDetails'],
    }),
  }),
});

export const {
  useGetCartDetailsQuery,
  useGetCartDetailByIdQuery,
  useGetCartDetailByCustomerIdQuery,
  useCreateCartDetailMutation,
  useUpdateCartDetailMutation,
  useDeleteCartDetailMutation,
} = cartDetailApi;