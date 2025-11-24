import { ApiError as IApiError } from '@/types/api.types';

export class ApiException extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly details?: any;

  constructor(error: IApiError) {
    super(error.message);
    this.name = 'ApiException';
    this.code = error.code;
    this.statusCode = error.statusCode;
    this.details = error.details;
    Object.setPrototypeOf(this, ApiException.prototype);
  }

  static fromAxiosError(error: any): ApiException {
    const statusCode = error.response?.status;
    const errorData = error.response?.data?.error || error.response?.data;

    return new ApiException({
      code: errorData?.code || `HTTP_${statusCode || 'UNKNOWN'}`,
      message: errorData?.message || error.message || 'An error occurred',
      statusCode,
      details: errorData?.details || error.response?.data,
    });
  }

  static fromNetworkError(error: any): ApiException {
    return new ApiException({
      code: 'NETWORK_ERROR',
      message: 'Network error. Please check your connection.',
      statusCode: 0,
      details: error.message,
    });
  }
}
