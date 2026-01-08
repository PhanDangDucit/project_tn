import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../auth/auth.services';
import queryBuilder from '~/hooks/queryBuilder';
import { TGetAllOrder, TGetOneOrder, TOrder } from '~/interfaces/types/order';
import { IResponse } from '~/interfaces/types/response';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 60,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query<IResponse<TGetAllOrder[]>, void>({
      query: () => '/api/v1/orders',
      providesTags: ['Orders'],
    }),
    getOrdersExport: builder.query<Blob, void>({
      query: () => ({ url: '/api/v1/orders/export/csv', responseHandler: async (response) => response.blob() }),
      providesTags: ['Orders'],
    }),
    getOrdersByUserId: builder.query({
      query: (customer_id) => `/api/v1/orders/customers/${customer_id}`,
      providesTags: ['Orders'],
    }),
    getOrdersPagination: builder.query<
      IResponse<TOrder[]>,
      { limit: number; page: number }
    >({
      query: ({ limit, page }) =>
        queryBuilder('/api/v1/orders', { limit, page }),
      providesTags: ['Orders'],
    }),
    getOrderById: builder.query<IResponse<TGetOneOrder>, string>({
      query: (id) => `/api/v1/orders/${id}`,
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation<IResponse<TOrder>, TOrder>({
      query: (orderData) => ({
        url: '/api/v1/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Orders'],
    }),
    updateOrder: builder.mutation<
      IResponse<TOrder>,
      { id: string; data: Partial<TOrder> }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/orders/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Orders'],
    }),
    // updateOrderStatus: builder.mutation<
    //   IResponse<TOrder>,
    //   { id: string; status: string }
    // >({
    //   query: ({ id, status }) => ({
    //     url: `/api/v1/orders/${id}/status`,
    //     method: 'PATCH',
    //     body: { status },
    //   }),
    //   invalidatesTags: ['Orders'],
    // }),
    cancelOrder: builder.mutation<
      IResponse<TOrder>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/api/v1/orders/${id}/cancel`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrdersExportQuery,
  useLazyGetOrdersExportQuery,
  useGetOrdersByUserIdQuery,
  useGetOrdersPaginationQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  // useUpdateOrderStatusMutation,
  useCancelOrderMutation
} = orderApi;
