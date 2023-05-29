import { BlogTagType } from '@/repository/blog/BlogTage';
import {
  removeBlogTagById,
  saveOrUpdateTag,
} from '@/services/blog/blogTagService';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import React from 'react';
import EditBlogTagPage from './EditBlogTagPage';

interface Props {
  record: BlogTagType.BlogTag;
  handleFetchList: () => void;
}

const MenuActionButtion: React.FC<Props> = React.memo(
  ({ record, handleFetchList }) => {
    const handleConfirm = async () => {
      const response = await removeBlogTagById(record.id);
      if (response.code === 200) {
        handleFetchList();
      }
    };

    return (
      <Space>
        <ModalForm<BlogTagType.BlogTag>
          title="编辑标签"
          modalProps={{
            destroyOnClose: true,
          }}
          width={500}
          trigger={<Button type="primary" icon={<EditOutlined />} />}
          onFinish={async (values) => {
            const data = { ...values, id: record.id };
            const response = await saveOrUpdateTag(data);
            if (response.code === 200) {
              handleFetchList();
            }
            return true;
          }}
        >
          <EditBlogTagPage record={record} />
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
  },
);

export default MenuActionButtion;
