export declare namespace SysUserType {
  interface SysUser {
    id: string;
    username: string;
    name: string;
    password: password;
    phone: string;
    deptName: string | null;
    postName: string | null;
    roleNameList: string[];
    status: number;
    description: string;
    headUrl: string;
    createTime: string;
  }

  interface PageQuery {
    current?: number;
    pageSize?: number;
    searchObj?: string;
    createTimeBegin?: string | null;
    createTimeEnd?: string | null;
  }

  interface SysUserVO {
    id: string;
    username: string;
    name: string;
    password: password;
    phone: string;
    headUrl: string;
    description: string;
    status: number;
    roleIdList: string[];
    roleNameList: string[];
    file?: any;
  }

  interface CurrentUser {
    id: string;
    username: string;
    headUrl: string;
  }

  interface LoginParams {
    name: string;
    password: password;
  }

  interface LoginToen {
    access_token: string;
    token_type: string;
  }
}
