import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponse } from '~/interfaces/types/response';
import { baseQueryWithReauth } from '../auth/auth.services';
import { TOrder } from '~/interfaces/types/order';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Payments'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    createVnpPayment: builder.mutation<IResponse<{payment_url: string}>, Partial<TOrder>>({
      query: (paymentData) => ({
        url: '/api/v1/payments/vnpay/create',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: ['Payments'],
    }),
  }),
});

export const {
  useCreateVnpPaymentMutation,
} = paymentApi;