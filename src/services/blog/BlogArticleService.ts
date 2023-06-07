import { BlogArticle } from '@/repository/blog/BlogArticle';
import { request } from '@umijs/max';

export async function saveArticle(params: BlogArticle.BlogArticle) {
  return request<BaseResponse<string>>(
    '/api/manager-system/blog/article/saveArticle',
    {
      method: 'PUT',
      data: params,
    },
  );
}
