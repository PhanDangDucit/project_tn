import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponse } from '~/interfaces/types/response';
import { baseQueryWithReauth } from '../auth/auth.services';
import { TPaymentMethod } from '~/interfaces/types/payment-method';

export const paymentMethodsApi = createApi({
  reducerPath: 'paymentMethodsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PaymentMethods'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<IResponse<TPaymentMethod[]>, void>({
      query: () => '/api/v1/payment-methods',
      providesTags: ['PaymentMethods'],
    }),

    getPaymentMethodById: builder.query<IResponse<TPaymentMethod>, string>({
      query: (id) => `/api/v1/payment-methods/${id}`,
      providesTags: ['PaymentMethods'],
    }),

    createPaymentMethod: builder.mutation<IResponse<TPaymentMethod>, TPaymentMethod>({
      query: (paymentMethodData) => ({
        url: '/api/v1/payment-methods',
        method: 'POST',
        body: paymentMethodData,
      }),
      invalidatesTags: ['PaymentMethods'],
    }),

    updatePaymentMethod: builder.mutation<
      IResponse<TPaymentMethod>,
      { id: string; data: TPaymentMethod }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/payment-methods/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PaymentMethods'],
    }),

    deletePaymentMethod: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/payment-methods/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PaymentMethods'],
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useGetPaymentMethodByIdQuery,
  useCreatePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
  useDeletePaymentMethodMutation,
} = paymentMethodsApi;