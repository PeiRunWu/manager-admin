import { BlogArticleType } from '@/repository/blog/BlogArticle';
import { removeBlogArticleById } from '@/services/blog/BlogArticleService';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Popconfirm, Space } from 'antd';
import React from 'react';

interface Props {
  record: BlogArticleType.BlogArticle;
  handleFetchList: () => void;
}

const ArticleActionButtons: React.FC<Props> = React.memo(
  ({ record, handleFetchList }) => {
    const handleConfirm = async () => {
      const response = await removeBlogArticleById(record.id);
      if (response.code === 200) {
        handleFetchList();
      }
    };

    const handleEdit = () => {
      history.push(`/blog/writeArticle/list?id=` + record.id);
    };
    return (
      <Space>
        <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} />

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
export default ArticleActionButtons;
