import Icon from '@/components/Icon';
import { SysMenuType } from '@/repository/system/SysMenu';
import { getSyMenuList, saveSysMenu } from '@/services/system/sysMenuService';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import EditSysMenuPage from './components/EditSysMenuPage';
import MenuActionButtion from './components/MenuActionButtion';
import StatusSwitch from './components/StatusSwitch';

const SysMenu: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [parentIds, setParentIds] = useState<string[]>(['0']);

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
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        0: '目录',
        1: '菜单',
      },
    },
    {
      title: '前端图标',
      dataIndex: 'icon',
      render: (_, record: any) =>
        record.icon ? <Icon name={record.icon} /> : null,
    },
    {
      title: '是否隐藏',
      dataIndex: 'hidden',
      render: (_, record) => <StatusSwitch record={record} />,
    },
    {
      title: '路由地址',
      dataIndex: 'path',
    },
    {
      title: '设置',
      dataIndex: 'setting',
      render: (_, record) => (
        <Button
          type="link"
          disabled={record.type === 1}
          onClick={() => {
            setParentIds([...parentIds, record.id]);
            handleFetchList();
          }}
        >
          查看下级
        </Button>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => (
        <MenuActionButtion record={record} handleFetchList={handleFetchList} />
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        search={false}
        rowKey={'id'}
        pagination={{ pageSize: 10 }}
        toolBarRender={() => [
          parentIds.length > 1 && (
            <Button
              key="back"
              icon={<RollbackOutlined />}
              onClick={() => {
                const newParentIds = parentIds.slice(0, -1);
                setParentIds(newParentIds);
                handleFetchList();
              }}
            >
              返回
            </Button>
          ),
          <ModalForm<SysMenuType.SysMenuVO>
            key="add"
            title="添加菜单"
            modalProps={{
              destroyOnClose: true,
            }}
            width={500}
            trigger={
              <Button key="button" icon={<PlusOutlined />} type="primary">
                新建
              </Button>
            }
            onFinish={async (values) => {
              const response = await saveSysMenu(values);
              if (response.code === 200) {
                handleFetchList();
              }
              return true;
            }}
          >
            <EditSysMenuPage />
          </ModalForm>,
        ]}
        request={async (params) => {
          const data = {
            current: params.current,
            pageSize: params.pageSize,
            searchObj: parentIds[parentIds.length - 1],
          };
          const response = await getSyMenuList(data);
          return {
            data: response.data.records,
            total: response.data.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default SysMenu;
