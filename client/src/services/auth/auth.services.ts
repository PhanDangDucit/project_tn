import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../redux/storage/store';
import {
  IRequestPasswordReset,
  IResetPasswordRequest,
  IChangePasswordRequest, // Thêm import mới
} from '../../interfaces/types/auth/auth';
// import { assignNewToken, logoutUser } from '../../services/auth/auth.slice';
import { IRequestCredentials } from './../../interfaces/types/auth/auth';
import { ICustomer, IUsersDetailResponse } from '~/interfaces/types/user';
import { IResponse } from '~/interfaces/types/response';
// import { assignAccessToken } from './auth.slice';

// const getMeBaseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL,
//   prepareHeaders: (headers, { getState }) => {
//     const state = getState() as RootState & {
//       auth: { currentUser: { refreshToken: string } };
//     };
//     const refreshToken = state.auth?.currentUser?.refreshToken;
//     if (refreshToken) {
//       headers.set('Authorization', `Bearer ${refreshToken}`);
//     }
//     console.log('Headers in getMeBaseQuery:', headers);
//     return headers;
//   },
// });

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = (
      state as RootState & { auth: { currentUser: { token: string } } }
    ).auth?.currentUser?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);
  // console.log('result in api services:', result);
  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 5,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    adminLogin: builder.mutation<IResponse<{ accessToken: string }>, IRequestCredentials>({
      query: (credentials) => ({
        url: '/api/v1/auth/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<IResponse<{ accessToken: string }>, IRequestCredentials>({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<IUsersDetailResponse, ICustomer>({
      query: (formData) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: formData,
      }),
    }),
    requestPasswordReset: builder.mutation<void, IRequestPasswordReset>({
      query: (requestPasswordReset) => ({
        url: '/api/v1/auth/request-password-reset',
        method: 'POST',
        body: requestPasswordReset,
      }),
    }),
    resetPassword: builder.mutation<void, IResetPasswordRequest>({
      query: (resetPasswordRequest) => ({
        url: '/api/v1/auth/reset-password',
        method: 'POST',
        body: resetPasswordRequest,
      }),
    }),
    verifyCode: builder.mutation<
      { message: string },
      { user_id: string; code: string }
    >({
      query: (verifyData) => ({
        url: '/api/v1/auth/verify-code',
        method: 'POST',
        body: verifyData,
      }),
    }),
    // Thêm endpoint mới cho changePassword
    changePassword: builder.mutation<
      { message: string },
      IChangePasswordRequest
    >({
      query: (changePasswordRequest) => ({
        url: '/api/v1/auth/change-password',
        method: 'POST',
        body: changePasswordRequest,
      }),
    }),
    getMe: builder.query<IResponse<ICustomer>, void>({
      query: () => `/api/v1/auth/me`,
    })
  }),
});

export const {
  useAdminLoginMutation,
  useLoginMutation,
  useRegisterMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useVerifyCodeMutation,
  useChangePasswordMutation, // Export hook mới
  useGetMeQuery,
} = authApi;
