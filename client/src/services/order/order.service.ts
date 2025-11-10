import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth/auth.services';
import queryBuilder from '~/hooks/queryBuilder';
import { TOrder } from '~/interfaces/types/order';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 60,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query<TOrder[], void>({
      query: () => '/api/v1/orders',
      providesTags: ['Orders'],
    }),
    getOrdersByUserId: builder.query({
      query: (user_id) => `/api/v1/orders/user/${user_id}`,
      providesTags: ['Orders'],
    }),
    getOrdersPagination: builder.query<
      TOrder[],
      { limit: number; page: number }
    >({
      query: ({ limit, page }) =>
        queryBuilder('/api/v1/orders', { limit, page }),
      providesTags: ['Orders'],
    }),
    getOrderById: builder.query<TOrder, string>({
      query: (id) => `/api/v1/orders/${id}`,
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation<TOrder[], TOrder>({
      query: (orderData) => ({
        url: '/api/v1/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Orders'],
    }),
    updateOrder: builder.mutation<
      TOrder,
      { id: string; data: Partial<TOrder> }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/orders/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Orders'],
    }),
    updateOrderStatus: builder.mutation<
      TOrder,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/api/v1/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrdersByUserIdQuery,
  useGetOrdersPaginationQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
