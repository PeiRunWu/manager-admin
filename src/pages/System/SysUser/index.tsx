import { SysUserType } from '@/repository/system/sysUser';
import {
  createSysUser,
  getSysUserList,
} from '@/services/system/sysUserService';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumnType,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import EditSysUserPage from './components/EditSysUserPage';
import RoleTagList from './components/RoleTagList';
import StatusSwitch from './components/StatusSwitch';
import UserActionButtons from './components/UserActionButtons';

const SysUser: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleRefresh = () => {
    actionRef?.current?.reload();
  };

  const columns: ProColumnType<SysUserType.SysUserVO>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '用户名',
      search: false,
      dataIndex: 'username',
    },
    {
      title: '姓名',
      search: false,
      dataIndex: 'name',
    },
    {
      title: '手机',
      search: false,
      dataIndex: 'phone',
    },
    {
      title: '岗位',
      search: false,
      dataIndex: 'deptName',
    },
    {
      title: '部门',
      search: false,
      dataIndex: 'postName',
    },
    {
      title: '所属角色',
      search: false,
      dataIndex: 'roleNameList',
      render: (roleList) => <RoleTagList roleNameList={roleList} />,
    },
    {
      title: '状态',
      search: false,
      dataIndex: 'status',
      render: (_, record) => (
        <StatusSwitch id={record.id} status={record.status} />
      ),
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
        <UserActionButtons record={record} handleRefresh={handleRefresh} />
      ),
    },
    {
      title: '关 键 字',
      dataIndex: 'searchObj',
      valueType: 'text',
      hideInTable: true,
      fieldProps: {
        placeholder: ['用户名/姓名/手机号码'],
      },
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      hideInTable: true,
      valueType: 'dateTimeRange',
    },
  ];

  return (
    <PageContainer>
      <ProTable<SysUserType.SysUserVO>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        pagination={{ pageSize: 10 }}
        toolBarRender={() => [
          <ModalForm<SysUserType.SysUserVO>
            key={'addButton'}
            title="新增用户信息"
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
              if (values.file) {
                values.headUrl = values.file[0]?.response.data || '';
              }
              delete values.file;
              const response = await createSysUser(values);
              if (response.code === 200) {
                handleRefresh();
              }
              return true;
            }}
          >
            <EditSysUserPage />
          </ModalForm>,
        ]}
        request={async (params) => {
          const data = {
            searchObj: params.searchObj,
            current: params.current,
            pageSize: params.pageSize,
            createTimeBegin:
              params.createTime && params.createTime.length > 0
                ? params.createTime[0]
                : '',
            createTimeEnd:
              params.createTime && params.createTime.length > 1
                ? params.createTime[1]
                : '',
          };
          const response = await getSysUserList(data);
          return {
            data: response.data.records,
            total: response.data.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default SysUser;
