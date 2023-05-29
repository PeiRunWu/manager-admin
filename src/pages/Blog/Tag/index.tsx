import { BlogTagType } from '@/repository/blog/BlogTage';
import {
  getBlogTagList,
  saveOrUpdateTag,
} from '@/services/blog/blogTagService';
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
import EditBlogTagPage from './components/EditBlogTagPage';
import MenuActionButtion from './components/MenuActionButtion';

const Tag: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [parentIds, setParentIds] = useState<string[]>(['0']);

  const handleFetchList = () => {
    actionRef?.current?.reload();
  };

  const columns: ProColumns<BlogTagType.BlogTag>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '标签名称',
      dataIndex: 'tagName',
      valueType: 'text',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        0: '父标签',
        1: '子标签',
      },
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
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
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
      <ProTable<BlogTagType.BlogTag>
        search={false}
        columns={columns}
        actionRef={actionRef}
        rowKey={'id'}
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
          <ModalForm<BlogTagType.BlogTag>
            key="add"
            title="添加标签"
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
              const response = await saveOrUpdateTag(values);
              if (response.code === 200) {
                handleFetchList();
              }
              return true;
            }}
          >
            <EditBlogTagPage />
          </ModalForm>,
        ]}
        request={async (params) => {
          const data = {
            current: params.current,
            pageSize: params.pageSize,
            searchObj: parentIds[parentIds.length - 1],
          };
          const response = await getBlogTagList(data);
          return {
            data: response.data.records,
            total: response.data.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default Tag;
