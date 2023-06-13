import { BlogArticleType } from '@/repository/blog/BlogArticle';
import { request } from '@umijs/max';

export async function saveArticle(params: BlogArticleType.BlogArticle) {
  return request<BaseResponse<string>>(
    '/api/manager-system/blog/article/saveArticle',
    {
      method: 'PUT',
      data: params,
    },
  );
}

export async function getBlogArticlePageList(
  params: BlogArticleType.PageQuery,
) {
  return request<BaseResponse<PageInfo<BlogArticleType.BlogArticle>>>(
    '/api/manager-system/blog/article/listPage',
    {
      method: 'GET',
      params,
    },
  );
}

export async function updateBlogArticleTop(
  params: BlogArticleType.BlogArticleTop,
) {
  return request<BaseResponse<string>>(
    '/api/manager-system/blog/article/updateBlogArticleTop',
    {
      method: 'PUT',
      data: params,
    },
  );
}

export async function removeBlogArticleById(id: string) {
  return request<BaseResponse<string>>(
    `/api/manager-system/blog/article/removeBlogArticleById/${id}`,
    {
      method: 'DELETE',
    },
  );
}

export async function getBlogArticleById(id: string) {
  return request<BaseResponse<BlogArticleType.BlogArticle>>(
    `/api/manager-system/blog/article/getBlogArticleById/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function updateBlogArticleById(
  params: BlogArticleType.BlogArticle,
) {
  return request<BaseResponse<BlogArticleType.BlogArticle>>(
    '/api/manager-system/blog/article/updateBlogArticleById',
    {
      method: 'PUT',
      data: params,
    },
  );
}
