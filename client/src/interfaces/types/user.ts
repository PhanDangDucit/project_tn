import { roleUser } from '~/interfaces/enum/roleUser';
import { IResponse } from './response';

export interface IUserLogin {
  _id?: string;
  token: string;
  refreshToken: string;
  branch_id: string;
  username: string;
  password: string;
  address: string;
  full_name: string;
  email: string;
  phone: string;
  status: number;
  sex: number;
  image: string;
  role: string;
  verificationCode: string | null;
  createdAt: string;
  updatedAt: string;
  isOnline: boolean;
  offlineSince: string | null;
}

export interface IUser {
  userId: string | undefined;
  _id?: string;
  token: string;
  refreshToken: string;
  address: string;
  username: string;
  password: string;
  full_name: string;
  email: string;
  phone: string;
  status: number;
  sex: number;
  image: string;
  role: roleUser;
  verificationCode: string | null;
  createdAt: string;
  updatedAt: string;
  isOnline: boolean;
  offlineSince: string | null;
}

// interface IResponse<T> {
//   status: number;
//   message: string;
//   length: number;
//   data: T;
//   total: number;
//   totalPages: number;
//   currentPage: number;
// }

export type IUsersResponse = IResponse<IUser[]>;
export type IUsersDetailResponse = IResponse<IUser>;