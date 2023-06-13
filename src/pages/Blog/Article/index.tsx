import { BlogArticleType } from '@/repository/blog/BlogArticle';
import { getBlogArticlePageList } from '@/services/blog/BlogArticleService';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { useRef } from 'react';
import StatusSwitch from './components/StatusSwitch';
import ArticleActionButtons from './components/ArticleActionButtons';

const Article: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleFetchList = () => {
    actionRef?.current?.reload();
  };

  const columns: ProColumns<BlogArticleType.BlogArticle>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '文章标题',
      dataIndex: 'articleTitle',
    },
    {
      title: '封面',
      dataIndex: 'cover',
      valueType: 'image',
      search: false,
    },
    {
      title: '文章摘要',
      dataIndex: 'articleSummary',
      search: false,
    },
    {
      title: '文章类型',
      dataIndex: 'articleType',
      valueType: 'select',
      valueEnum: {
        0: '原创',
        1: '转载',
        2: '翻译',
      },
    },
    {
      title: '是否置顶',
      dataIndex: 'top',
      search: false,
      render: (_, record) => (
        <StatusSwitch record={record} handleFetchList={handleFetchList} />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      render: (_, record) => (
        <ArticleActionButtons record={record} handleFetchList={handleFetchList} />
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<BlogArticleType.BlogArticle>
        columns={columns}
        rowKey="id"
        actionRef={actionRef}
        pagination={{ pageSize: 10 }}
        request={async (params) => {
          const data = {
            ...params,
            articleTitle: params.articleTitle,
            articleType: params.articleType,
          };
          const response = await getBlogArticlePageList(data);
          return {
            data: response.data.records,
            total: response.data.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default Article;
