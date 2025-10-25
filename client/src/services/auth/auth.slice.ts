import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from './auth.services';
import { IAuth, IAuthState } from '../../interfaces/types/auth/auth';
import { IUserLogin } from '~/interfaces/types/user';

const initialState: IAuthState = {
  loggedIn: false,
  errorMessage: null,
  accessToken: null,
  currentUser: null,
  role: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: () => initialState,
    clearLoginErrorMessage: (state) => ({
      ...state,
      errorMessage: null,
    }),
    assignAccessToken: (state, action) => {
      console.log('state prev: ', state);
      console.log('Assigning new access token:', action.payload);

      return {
      ...state,
        accessToken: action.payload,
      }
    },
    setAuthCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
    setAuthData: (state, action) => {
      console.log('state:', state);
      console.log('Setting auth data with token:', action.payload);
      return {
        ...state,
        accessToken: action.payload,
      }
    },
  },
  /**
   * Service fullfiled matcher to handle login response
   */
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(authApi.endpoints.login.matchFulfilled),
      (state, action) => {
        const response = action.payload;
        console.log('authSlice login response:', response);
        if (response?.status == 200) {
          state.loggedIn = true;
          state.errorMessage = null;
          state.accessToken = response?.data?.accessToken;
          state.role = "customer";
        } else {
          state.loggedIn = false;
          state.errorMessage = "Login failed. Please check your credentials.";
          state.currentUser = null;
        }
      },
    )
    .addMatcher(
      isAnyOf(authApi.endpoints.adminLogin.matchFulfilled),
      (state, action) => {
        const response = action.payload;
        console.log('authSlice login response:', response);
        if (response?.status == 200) {
          state.loggedIn = true;
          state.errorMessage = null;
          state.accessToken = response?.data?.accessToken;
          state.role = "admin";
        } else {
          state.loggedIn = false;
          state.errorMessage = "Login failed. Please check your credentials.";
          state.currentUser = null;
        }
      },
    );
  },
});

const { reducer, actions } = authSlice;
export const {
  logoutUser,
  clearLoginErrorMessage,
  assignAccessToken,
  setAuthCurrentUser,
} = actions;
export default reducer;
