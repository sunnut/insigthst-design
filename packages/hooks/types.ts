export interface Result<T = unknown> {
  success: boolean;
  data?: T;
  total?: number;
  hasMore?: boolean;
  message?: string;
}
