import { BlogTagType } from '@/repository/blog/BlogTage';
import { request } from '@umijs/max';

export async function getBlogTagList(params: BlogTagType.PageQuery) {
  return request<BaseResponse<PageInfo<BlogTagType.BlogTag>>>(
    '/api/manager-system/blog/tag/listPage',
    {
      method: 'GET',
      params,
    },
  );
}

export async function getParentTagItems() {
  return request<BaseResponse<BlogTagType.BlogTag[]>>(
    '/api/manager-system/blog/tag/getParentTagItems',
    {
      method: 'GET',
    },
  );
}

export async function saveOrUpdateTag(params: BlogTagType.BlogTag) {
  return request<BaseResponse<BlogTagType.BlogTag>>(
    '/api/manager-system/blog/tag/saveOrUpdateTag',
    {
      method: 'PUT',
      data: params,
    },
  );
}

export async function removeBlogTagById(id: string) {
  return request<BaseResponse<string>>(
    `/api/manager-system/blog/tag/removeBlogTagById/${id}`,
    {
      method: 'DELETE',
    },
  );
}

export async function getBlogTagTreeNode() {
  return request<BaseResponse<BlogTagType.TreeNode[]>>(
    '/api/manager-system/blog/tag/getBlogTagTreeNode',
    {
      method: 'GET',
    },
  );
}
