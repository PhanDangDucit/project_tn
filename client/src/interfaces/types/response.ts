export interface IResponse<T> {
  status: number;
  message: string;
  length: number;
  data: T;
  total: number;
}