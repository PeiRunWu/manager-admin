import { SysRoleType } from '@/repository/system/SysRole';
import {
  batchRemoveRole,
  getSyRoleList,
  saveOrUpdateRole,
} from '@/services/system/sysRoleService';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useRef } from 'react';
import EditSysRolePage from './components/EditSysRolePage';
import RoleActionButton from './components/RoleActionButton';

const SysRole: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleFetchList = () => {
    actionRef?.current?.reload();
  };

  const columns: ProColumns<SysRoleType.SysRole>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      valueType: 'text',
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      search: false,
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      render: (_, record) => (
        <RoleActionButton record={record} handleFetchList={handleFetchList} />
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey={'id'}
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space size={24}>
              <span>
                已选择 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Button
              type="primary"
              danger
              onClick={async () => {
                const response = await batchRemoveRole(selectedRowKeys);
                if (response.code === 200) {
                  onCleanSelected();
                  handleFetchList();
                }
              }}
            >
              批量删除
            </Button>
          );
        }}
        toolBarRender={() => [
          <ModalForm<SysRoleType.SysRoleVO>
            key={'addButton'}
            title="新增角色信息"
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
              const response = await saveOrUpdateRole(values);
              if (response.code === 200) {
                handleFetchList();
              }
              return true;
            }}
          >
            <EditSysRolePage />
          </ModalForm>,
        ]}
        request={async (params) => {
          const data = {
            current: params.current,
            pageSize: params.pageSize,
            searchObj: params.roleName,
          };
          const response = await getSyRoleList(data);
          return {
            data: response.data.records,
            total: response.data.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default SysRole;
