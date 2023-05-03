import { SysRoleType } from '@/repository/system/SysRole';
import {
  batchRemoveRole,
  saveOrUpdateRole,
} from '@/services/system/sysRoleService';
import { DeleteOutlined, EditOutlined, MenuOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import EditSysRolePage from './EditSysRolePage';

interface Props {
  record: SysRoleType.SysRole;
  handleFetchList: () => void;
}

const RoleActionButton: FC<Props> = React.memo(
  ({ record, handleFetchList }) => {
    const { id, roleName } = record;

    const handelDelete = async () => {
      const response = await batchRemoveRole([id]);
      if (response.code === 200) {
        handleFetchList();
      }
    };

    const handleAssignMenu = () => {
      history.push(`/system/sysMenu/assignAuth?id=${id}&roleName=${roleName}`);
    };

    return (
      <Space>
        <ModalForm<SysRoleType.SysRoleVO>
          title="编辑角色信息"
          trigger={<Button type="primary" icon={<EditOutlined />} />}
          modalProps={{
            destroyOnClose: true,
          }}
          width={500}
          onFinish={async (values) => {
            const data = { id, ...values };
            const response = await saveOrUpdateRole(data);
            if (response.code === 200) {
              handleFetchList();
            }
            return true;
          }}
        >
          <EditSysRolePage record={record} />
        </ModalForm>

        <Popconfirm
          title="删除数据"
          description="请问是否需要删除该数据?"
          okText="确定"
          cancelText="取消"
          placement="top"
          onConfirm={handelDelete}
        >
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Popconfirm>

        <Tooltip title="分配权限">
          <Button
            type="primary"
            icon={<MenuOutlined />}
            style={{ backgroundColor: '#E6A23C' }}
            onClick={handleAssignMenu}
          />
        </Tooltip>
      </Space>
    );
  },
);

export default RoleActionButton;
