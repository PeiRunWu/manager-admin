import { SysMenuType } from '@/repository/system/SysMenu';
import {
  getAllMenuItems,
  getResourcePageList,
  saveSysMenu,
} from '@/services/system/sysMenuService';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import EditSysResourcePage from './components/EditSysResourcePage';
import RescourceActionButtion from './components/RescourceActionButtion';

const SysResource: React.FC = () => {
  const [options, setOptions] = useState<Record<string, string> | null>(null);
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllMenuItems();
      if (response.code === 200) {
        const menuList: Record<string, string> = response.data.reduce(
          (acc: any, menu: SysMenuType.SysMenuVO) => {
            acc[menu.id] = menu.name;
            return acc;
          },
          {},
        );
        setOptions(menuList);
      }
    };
    fetchData();
  }, []);

  const handleFetchList = () => {
    actionRef?.current?.reload();
  };

  const columns: ProColumns<SysMenuType.SysMenuVO>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '资源名称',
      dataIndex: 'name',
    },
    {
      title: '资源路径',
      dataIndex: 'path',
    },
    {
      title: '排序',
      search: false,
      dataIndex: 'sortValue',
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      render: (_, record) => (
        <RescourceActionButtion
          record={record}
          handleFetchList={handleFetchList}
        />
      ),
    },
    {
      title: '资源分类',
      dataIndex: 'parentId',
      valueType: 'select',
      hideInTable: true,
      valueEnum: () => options || {},
    },
  ];

  return (
    <PageContainer>
      <ProTable<SysMenuType.SysMenuVO>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => [
          <ModalForm<SysMenuType.SysMenuVO>
            key={'addResource'}
            title="添加资源"
            modalProps={{
              destroyOnClose: true,
            }}
            width={500}
            trigger={
              <Button icon={<PlusOutlined />} type="primary">
                新建
              </Button>
            }
            onFinish={async (values) => {
              const data = { ...values, type: 2 };
              const response = await saveSysMenu(data);
              if (response.code === 200) {
                handleFetchList();
              }
              return true;
            }}
          >
            <EditSysResourcePage />
          </ModalForm>,
        ]}
        request={async (params) => {
          const response = await getResourcePageList(params);
          return {
            data: response.data.records,
            total: response.data.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default SysResource;
