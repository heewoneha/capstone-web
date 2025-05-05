import { useState, useCallback } from 'react';
import api from '../utils/api';

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  resetData?: boolean;
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const request = useCallback(
    async (
      method: HttpMethod,
      url: string,
      payload?: any,
      options?: UseApiOptions<T>
    ): Promise<ApiResponse<T>> => {
      try {
        setLoading(true);
        setError(null);

        if (options?.resetData) {
          setData(null);
        }

        let response;
        if (method === 'get') {
          response = await api.get<ApiResponse<T>>(url, { params: payload });
        } else {
          response = await api[method]<ApiResponse<T>>(url, payload);
        }

        const result = response.data;
        setData(result.data);
        options?.onSuccess?.(result.data);
        return result;
      } catch (err) {
        const error = err as Error;
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    data,
    request,
  };
}
