import { ICustomer } from "../user";

export interface IAuth {
  loggedIn: boolean;
  errorMessage: string | null;
  currentUser: ICustomer;
}

export type IAuthState = {
  loggedIn: boolean;
  errorMessage: string | null;
  currentUser: ICustomer | null;
  accessToken?: string | null;
  role?: string | null;
}

export interface IRequestCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  statusCode: number;
  data: {
    userData: ICustomer;
    status: string;
  };
}

export interface IRequestPasswordReset {
  email: string;
}

export interface IResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ILogoutError {
  data: {
    message: string;
  };
}

export interface IChangePasswordRequest {
  currentPassword: string;
  password_confirmation: string;
  password: string;
}
