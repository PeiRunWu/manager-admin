import { SysUserType } from '@/repository/system/sysUser';
import { request } from '@umijs/max';

export async function getSysUserList(params: SysUserType.PageQuery) {
  return request<BaseResponse<PageInfo<SysUserType.SysUserVO>>>(
    '/api/system/sysUser/listPage',
    {
      method: 'GET',
      params,
    },
  );
}

export async function updateSysUserStatus(id: string, status: number) {
  return request<BaseResponse<string>>(
    `/api/system/sysUser/updateStatus/${id}/${status}`,
    {
      method: 'GET',
    },
  );
}

export async function getSysUserById(id: string) {
  return request<BaseResponse<SysUserType.SysUserVO>>(
    `/api/system/sysUser/get/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function createSysUser(params: SysUserType.SysUserVO) {
  return request<BaseResponse<string>>('/api/system/sysUser/register', {
    method: 'POST',
    data: params,
  });
}

export async function updateSysUserById(params: SysUserType.SysUserVO) {
  return request<BaseResponse<string>>('/api/system/sysUser/update', {
    method: 'PUT',
    data: params,
  });
}

export async function deleteSysUserById(id: string) {
  return request<BaseResponse<string>>(`/api/system/sysUser/delete/${id}`, {
    method: 'DELETE',
  });
}

export async function login(body: SysUserType.LoginParams) {
  return request<BaseResponse<SysUserType.LoginToen>>('/api/auth/login', {
    method: 'POST',
    data: body,
  });
}

export async function outLogin() {
  return request<BaseResponse<SysUserType.LoginToen>>('/api/auth/logout', {
    method: 'POST',
  });
}

export async function queryCurrentUser() {
  return request<BaseResponse<SysUserType.CurrentUser>>(
    '/api/system/sysUser/info',
    {
      method: 'GET',
    },
  );
}


