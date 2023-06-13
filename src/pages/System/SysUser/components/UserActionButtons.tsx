import { SysUserType } from '@/repository/system/sysUser';
import { doAssignRole, getAllRoleItem } from '@/services/system/sysRoleService';
import {
  deleteSysUserById,
  updateSysUserById,
} from '@/services/system/sysUserService';
import {
  DeleteOutlined,
  EditOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import React, { FC } from 'react';
import EditSysUserPage from './EditSysUserPage';

interface Props {
  record: SysUserType.SysUserVO;
  handleRefresh: () => void;
}

const UserActionButtons: FC<Props> = React.memo(({ record, handleRefresh }) => {
  const handleDelete = async () => {
    const response = await deleteSysUserById(record.id);
    if (response.code === 200) {
      handleRefresh();
    }
  };

  return (
    <Space>
      <ModalForm<SysUserType.SysUserVO>
        title="编辑用户信息"
        modalProps={{
          destroyOnClose: true,
        }}
        width={500}
        trigger={<Button type="primary" icon={<EditOutlined />} />}
        onFinish={async (values) => {
          const data = {
            ...values,
            id: record.id,
          };
          if (values.file) {
            data.headUrl = values.file[0]?.response.data || '';
          }
          delete data.file;
          const response = await updateSysUserById(data);
          if (response.code === 200) {
            handleRefresh();
          }
          return true;
        }}
      >
        <EditSysUserPage record={record} />
      </ModalForm>

      <Popconfirm
        title="删除数据"
        description="请问是否需要删除该数据?"
        okText="确定"
        cancelText="取消"
        placement="top"
        onConfirm={handleDelete}
      >
        <Button type="primary" danger icon={<DeleteOutlined />} />
      </Popconfirm>

      <ModalForm<{ roleIdList: string[] }>
        title="分配角色"
        modalProps={{
          destroyOnClose: true,
        }}
        width={500}
        trigger={
          <Button
            type="primary"
            icon={<UserSwitchOutlined />}
            style={{ backgroundColor: '#E6A23C' }}
          />
        }
        onFinish={async (values) => {
          const data = { ...values, userId: record.id };
          const response = await doAssignRole(data);
          if (response.code === 200) {
            handleRefresh();
          }
          return true;
        }}
      >
        <ProFormSelect
          style={{ marginTop: 10 }}
          name={'roleIdList'}
          mode="multiple"
          debounceTime={300}
          initialValue={record.roleIdList}
          request={async () => {
            const response = await getAllRoleItem();
            return response.data.map((role) => ({
              value: role.id,
              label: role.roleName,
            }));
          }}
        />
      </ModalForm>
    </Space>
  );
});

export default UserActionButtons;
