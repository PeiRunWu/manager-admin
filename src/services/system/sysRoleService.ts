import { SysRoleType } from '@/repository/system/SysRole';
import { request } from '@umijs/max';

export async function getSyRoleList(params: SysRoleType.PageQuery) {
  return request<BaseResponse<PageInfo<SysRoleType.SysRole>>>(
    '/api/manager-system/system/sysRole/listPage',
    {
      method: 'GET',
      params,
    },
  );
}

export async function batchRemoveRole(ids: React.Key[]) {
  return request<BaseResponse<string>>(
    '/api/manager-system/system/sysRole/batchRemove',
    {
      method: 'DELETE',
      data: ids,
    },
  );
}

export async function saveOrUpdateRole(params: SysRoleType.SysRoleVO) {
  return request<BaseResponse<string>>(
    '/api/manager-system/system/sysRole/saveOrUpdate',
    {
      method: 'POST',
      data: params,
    },
  );
}

export async function getAllRoleItem() {
  return request<BaseResponse<SysRoleType.SysRoleVO[]>>(
    '/api/manager-system/system/sysRole/getAllRole',
    {
      method: 'GET',
    },
  );
}

export async function doAssignRole(parms: SysRoleType.AssignRole) {
  return request<BaseResponse<string>>(
    '/api/manager-system/system/sysRole/doAssignRole',
    {
      method: 'POST',
      data: parms,
    },
  );
}
