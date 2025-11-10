import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../auth/auth.services';
import { TOrderDetail } from '~/interfaces/types/order';

export const orderDetailApi = createApi({
  reducerPath: 'orderDetailApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getOrderDetails: builder.query<TOrderDetail, void>({
      query: () => '/api/v1/order-details',
    }),
    getOrderDetailsByOrderId: builder.query<TOrderDetail, string>({
      query: (order_id) => `/api/v1/order-details/order/${order_id}`,
    }),
    getOrderDetailById: builder.query<TOrderDetail, string>({
      query: (id) => `/api/v1/order-details/${id}`,
    }),
    createOrderDetail: builder.mutation<TOrderDetail[], TOrderDetail>({
      query: (orderDetailData) => ({
        url: '/api/v1/order-details',
        method: 'POST',
        body: orderDetailData,
      }),
    }),
    updateOrderDetail: builder.mutation<
      TOrderDetail,
      { id: string; data: Partial<TOrderDetail> }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/order-details/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOrderDetailsQuery,
  useGetOrderDetailsByOrderIdQuery,
  useGetOrderDetailByIdQuery,
  useCreateOrderDetailMutation,
  useUpdateOrderDetailMutation,
} = orderDetailApi;
