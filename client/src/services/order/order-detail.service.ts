import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../auth/auth.services';
import { TGetAllOrderDetail, TOrderDetail } from '~/interfaces/types/order';
import { IResponse } from '~/interfaces/types/response';

export const orderDetailApi = createApi({
  reducerPath: 'orderDetailApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getOrderDetails: builder.query<IResponse<TOrderDetail[]>, void>({
      query: () => '/api/v1/order-details',
    }),
    getOrderDetailsByOrderId: builder.query<IResponse<TGetAllOrderDetail[]>, string>({
      query: (order_id) => `/api/v1/order-details/order/${order_id}`,
    }),
    getOrderDetailById: builder.query<IResponse<TOrderDetail>, string>({
      query: (id) => `/api/v1/order-details/${id}`,
    }),
    createOrderDetail: builder.mutation<IResponse<TOrderDetail[]>, TOrderDetail>({
      query: (orderDetailData) => ({
        url: `/api/v1/order-details`,
        method: 'POST',
        body: orderDetailData,
      }),
    }),
    createOrderDetailByOrderId: builder.mutation<IResponse<TOrderDetail[]>, {id: string; data:TOrderDetail}>({
      query: ({id, data}) => ({
        url: `/api/v1/orders/${id}/order-details`,
        method: 'POST',
        body: data,
      }),
    }),
    updateOrderDetail: builder.mutation<
      IResponse<TOrderDetail>,
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
  useCreateOrderDetailByOrderIdMutation,
  useUpdateOrderDetailMutation,
} = orderDetailApi;
