import { IUserLogin } from "../user";

export interface IAuth {
  loggedIn: boolean;
  errorMessage: string | null;
  currentUser: IUserLogin;
}

export interface IRequestCredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  statusCode: number;
  data: {
    userData: IUserLogin;
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
  oldPassword: string;
  newPassword: string;
}
