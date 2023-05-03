import { SysMenuType } from '@/repository/system/SysMenu';
import {
  removeSysMenu,
  updateMenuById,
} from '@/services/system/sysMenuService';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import React from 'react';
import EditSysResourcePage from './EditSysResourcePage';

interface Props {
  record: SysMenuType.SysMenuVO;
  handleFetchList: () => void;
}

const RescourceActionButtion: React.FC<Props> = ({
  record,
  handleFetchList,
}) => {
  const handleConfirm = async () => {
    const response = await removeSysMenu(record.id);
    if (response.code === 200) {
      handleFetchList();
    }
  };

  return (
    <Space>
      <ModalForm<SysMenuType.SysMenuVO>
        title="编辑资源"
        modalProps={{
          destroyOnClose: true,
        }}
        width={500}
        trigger={<Button type="primary" icon={<EditOutlined />} />}
        onFinish={async (values) => {
          const data = { ...values, id: record.id };
          const response = await updateMenuById(data);
          if (response.code === 200) {
            handleFetchList();
          }
          return true;
        }}
      >
        <EditSysResourcePage record={record} />
      </ModalForm>

      <Popconfirm
        title="删除数据"
        description="请问是否需要删除该数据?"
        okText="确定"
        cancelText="取消"
        placement="top"
        onConfirm={handleConfirm}
      >
        <Button type="primary" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Space>
  );
};

export default RescourceActionButtion;
