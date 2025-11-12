import { createApi } from '@reduxjs/toolkit/query/react';
import { IResponse } from '~/interfaces/types/response';
import { baseQueryWithReauth } from '../auth/auth.services';
import { TContact } from '~/interfaces/types/contact';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Contacts'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getContact: builder.query<IResponse<TContact[]>, void>({
      query: () => '/api/v1/contacts',
      providesTags: ['Contacts'],
    }),

    getContactById: builder.query<IResponse<TContact>, string>({
      query: (id) => `/api/v1/contacts/${id}`,
      providesTags: ['Contacts'],
    }),

    createContact: builder.mutation<IResponse<TContact>, TContact>({
      query: (productCategoryData) => ({
        url: '/api/v1/contacts',
        method: 'POST',
        body: productCategoryData,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
    useGetContactQuery,
    useGetContactByIdQuery,
    useCreateContactMutation
} = contactApi;