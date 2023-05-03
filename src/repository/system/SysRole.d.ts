export declare namespace SysRoleType {
  interface SysRole {
    id: string;
    roleName: string;
    roleCode: string;
    description: password;
    createTime: string;
  }

  interface SysRoleVO {
    id?: string;
    roleName: string;
    roleCode: string;
    description: password;
  }


  interface PageQuery {
    current?: number;
    pageSize?: number;
    searchObj?: string;
  }

  interface AssignRole {
    userId: string;
    roleIdList: string[];
  }
}
