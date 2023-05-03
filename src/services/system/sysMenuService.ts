import { SysMenuType } from '@/repository/system/SysMenu';
import { request } from '@umijs/max';

export async function getSyMenuList(params: SysMenuType.PageQuery) {
  return request<BaseResponse<PageInfo<SysMenuType.SysMenuVO>>>(
    '/api/system/sysMenu/listPage',
    {
      method: 'GET',
      params,
    },
  );
}

export async function updateSysMenuHidden(id: string, hidden: number) {
  return request<BaseResponse<string>>(
    `/api/system/sysMenu/updateHidden/${id}/${hidden}`,
    {
      method: 'GET',
    },
  );
}

export async function getAllTableItems() {
  return request<BaseResponse<SysMenuType.SysMenuVO[]>>(
    '/api/system/sysMenu/getAllTableItems',
    {
      method: 'GET',
    },
  );
}

export async function saveSysMenu(params: SysMenuType.SysMenuVO) {
  return request<BaseResponse<string>>('/api/system/sysMenu/saveMenu', {
    method: 'POST',
    data: params,
  });
}

export async function removeSysMenu(id: string) {
  return request<BaseResponse<string>>(`/api/system/sysMenu/remove/${id}`, {
    method: 'DELETE',
  });
}

export async function updateMenuById(params: SysMenuType.SysMenuVO) {
  return request<BaseResponse<string>>('/api/system/sysMenu/updateMenuById', {
    method: 'PUT',
    data: params,
  });
}

export async function toAssignAuth(roleId: string) {
  return request<BaseResponse<SysMenuType.SysMenuDataNode>>(
    `/api/system/sysMenu/toAssign/${roleId}`,
    {
      method: 'GET',
    },
  );
}

export async function doAssignAuth(params: SysMenuType.AssignMenuVO) {
  return request<BaseResponse<string>>('/api/system/sysMenu/doAssign', {
    method: 'POST',
    data: params,
  });
}

export async function getResourcePageList(params: SysMenuType.PageQuery) {
  return request<BaseResponse<PageInfo<SysMenuType.SysMenuVO>>>(
    '/api/system/sysMenu/resourceListPage',
    {
      method: 'GET',
      params,
    },
  );
}

export async function getAllMenuItems() {
  return request<BaseResponse<SysMenuType.SysMenuVO[]>>(
    '/api/system/sysMenu/getAllMenuItems',
    {
      method: 'GET',
    },
  );
}

export async function queryCurrentUserMenus() {
  return request<BaseResponse<SysMenuType.MenuItem[]>>(
    '/api/system/sysMenu/getUserMenu',
    {
      method: 'GET',
    },
  );
}

