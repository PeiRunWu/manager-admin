import { DataNode } from 'antd/es/tree';

export declare namespace SysMenuType {
  interface SysMenu {
    id: string;
    parentId: string;
    name: string;
    path: string;
    type: number;
    hidden: number;
    icon: string;
    sortValue: number;
    createTime: string;
  }

  interface PageQuery {
    current?: number;
    pageSize?: number;
    searchObj?: string;
    name?: string;
    path?: string;
    parentId?: string;
  }

  interface SysMenuVO {
    id: string;
    parentId: string;
    name: string;
    path: string;
    type: number;
    hidden: number;
    icon: string;
    sortValue: number;
  }

  interface SysMenuDataNode {
    menuIds: string[];
    dataNode: DataNode[];
  }

  interface AssignMenuVO {
    roleId: string;
    menuIdList: React.Key[];
  }

  interface MenuItem {
    id: string;
    path: string;
    name: string;
    icon: string;
    sortValue: number;
    hideInMenu: boolean;
    routes: MenuItem[];
  }
}
