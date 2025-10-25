export interface IResponse<T> {
  status: number;
  message: string;
  error: boolean;
  data: T|null;
  limit?: number;
  offset?: number;
}