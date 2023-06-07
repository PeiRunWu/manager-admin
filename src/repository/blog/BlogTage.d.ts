export declare namespace BlogTagType {
  interface BlogTag {
    id: string;
    parentId: string;
    tagName: string;
    type: number;
    createTime: string;
  }

  interface PageQuery {
    current?: number;
    pageSize?: number;
    searchObj?: string;
  }
  interface TreeNode {
    title: string;
    value: string;
    children: TreeNode[];
  }
}
