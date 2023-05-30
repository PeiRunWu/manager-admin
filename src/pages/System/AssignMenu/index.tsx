import { doAssignAuth, toAssignAuth } from '@/services/system/sysMenuService';
import { CheckOutlined, RedoOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import { Button, Space, Tree } from 'antd';
import { DataNode, TreeProps } from 'antd/es/tree';
import { useEffect, useState } from 'react';

const AssignMenuAuth: React.FC = () => {
  const location = useLocation();
  const [treeDataNode, setTreeDataNode] = useState<DataNode[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [combinedKeys, setCombinedKeys] = useState<React.Key[]>([]);

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') ?? '';
  const roleName = searchParams.get('roleName') ?? '';

  const handleSuccess = async () => {
    setLoading(true);
    const response = await doAssignAuth({
      roleId: id,
      menuIdList: combinedKeys,
    });
    if (response.code === 200) {
      setLoading(false);
      history.push('/system/sysRole/list');
    }
  };

  const findParentKey = (
    key: string,
    nodes: DataNode[] = [],
  ): string | number => {
    for (const node of nodes) {
      if (node.children && node.children.some((child) => child.key === key)) {
        return node.key;
      }
      if (node.children) {
        const parentKey = findParentKey(key, node.children);
        if (parentKey) {
          return parentKey;
        }
      }
    }
    return '';
  };

  const handleCheck: TreeProps['onCheck'] = (keys: any) => {
    const parentKeys = keys
      .map((key: string) => findParentKey(key, treeDataNode))
      .filter((key: string | null) => key !== '');
    const combinedKeys = Array.from(new Set([...keys, ...parentKeys]));
    setSelectedKeys(keys);
    setCombinedKeys(combinedKeys);
  };

  const handleBack = () => {
    history.push('/system/sysRole/list');
  };

  function filterParentNodes(
    dataNodes: DataNode[],
    menuIds: React.Key[],
  ): React.Key[] {
    let checkedMenuIds = [...menuIds];

    function traverseTree(node: DataNode): boolean {
      if (node.children && node.children.length > 0) {
        const childrenChecked = node.children.map((child) =>
          traverseTree(child),
        );
        const allChildrenChecked = childrenChecked.every((val) => val);
        if (!allChildrenChecked) {
          checkedMenuIds = checkedMenuIds.filter(
            (id) => id !== String(node.key),
          );
        }
        return allChildrenChecked;
      } else {
        return checkedMenuIds.includes(String(node.key));
      }
    }
    dataNodes.forEach(traverseTree);
    return checkedMenuIds as React.Key[];
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await toAssignAuth(id);
      if (response.code === 200) {
        const { dataNode, menuIds } = response.data;
        setTreeDataNode(dataNode);
        const filteredMenuIdsArray = filterParentNodes(dataNode, menuIds);
        setSelectedKeys(filteredMenuIdsArray);
        setCombinedKeys(menuIds);
      }
    };
    fetchData();
  }, []);

  return (
    <PageContainer>
      <ProCard bordered>
        <div style={{ padding: '20px 20px 0 20px' }}>授权角色：{roleName}</div>
        <div style={{ padding: '20px 20px' }}>
          <Tree
            checkable
            treeData={treeDataNode}
            checkedKeys={selectedKeys}
            onCheck={handleCheck}
          />
        </div>
        <div style={{ padding: '20px 20px' }}>
          <Space>
            <Button
              icon={<CheckOutlined />}
              type="primary"
              loading={loading}
              onClick={handleSuccess}
            >
              保存
            </Button>
            <Button icon={<RedoOutlined />} onClick={handleBack}>
              返回
            </Button>
          </Space>
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default AssignMenuAuth;
