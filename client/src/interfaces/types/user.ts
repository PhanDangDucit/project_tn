import { IResponse } from './response';

export interface IUserLogin {
  _id?: string;
  username?: string;
  password?: string;
  address?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  status?: number;
  sex?: number;
  avatar?: string;
  verificationCode?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICustomer {
  id?: string;
  avatar?: string;
  address?: string;
  username?: string;
  password?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  sex?: number;
  is_block?: boolean;
  verificationCode?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type IUsersResponse = IResponse<ICustomer[]>;
export type IUsersDetailResponse = IResponse<ICustomer>;