import { ReduxStatus } from './reduxStatusValues';

export type Error = string | null | undefined;

export interface AlertState {
  successMessage: string;
  errorMessage: string;
}

export interface ApiResponse {
  status: ReduxStatus;
  error: Error;
  alert: AlertState;
}

export type ApiDataResponse<T> = ApiResponse &
  (T extends any[] ? { data: T } : { data: T | null });
