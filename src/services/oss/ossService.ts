import { OssType } from '@/repository/oss/Oss';
import { request } from '@umijs/max';

export async function deleteOssFile(params: OssType.Oss) {
  return request<BaseResponse<string>>(
    '/api/manager-third-party/oss/deleteOssFile',
    {
      method: 'DELETE',
      params,
    },
  );
}
