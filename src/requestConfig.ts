import type { RequestOptions } from '@@/plugin-request/request';
import { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { getWithExpiry } from './utils/localStorage';

interface ResponseStructure<T> {
  code: number;
  data: T;
  message: string;
}

export const requestConfig: RequestConfig = {
  errorConfig: {
    errorThrower: () => {},
    errorHandler: () => {},
  },

  requestInterceptors: [
    (config: RequestOptions) => {
      const url = config?.url;
      const token = getWithExpiry('manager-admin');
      const headers = { ...config.headers };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        delete headers.Authorization;
      }

      return {
        ...config,
        url,
        headers,
      };
    },
  ],

  responseInterceptors: [
    (response) => {
      const { data } = response as unknown as ResponseStructure<any>;

      if (data?.code !== 200) {
        message.error('操作失败！错误信息: [' + data?.message + ']');
      }
      return response;
    },
  ],
};
