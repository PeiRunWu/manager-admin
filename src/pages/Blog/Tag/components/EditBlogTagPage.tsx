import { BlogTagType } from '@/repository/blog/BlogTage';
import { getParentTagItems } from '@/services/blog/blogTagService';
import {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import React from 'react';

interface Props {
  record?: BlogTagType.BlogTag;
}

const EditBlogTagPage: React.FC<Props> = React.memo(({ record }) => {
  async function getExtendedTagItems(record?: BlogTagType.BlogTag) {
    const response = await getParentTagItems();

    const tagItems = response.data.map((tag) => ({
      value: tag.id,
      label: tag.tagName,
    }));

    const staticOption = {
      label: '无父标签',
      value: '0',
    };

    const filteredOptions = tagItems.filter(
      (option) => option.value !== record?.id,
    );

    return [staticOption, ...(record ? filteredOptions : tagItems)];
  }

  return (
    <>
      <ProFormSelect
        name={'parentId'}
        label="上级标签"
        debounceTime={300}
        initialValue={record?.parentId}
        request={() => getExtendedTagItems()}
        rules={[{ required: true, message: '请选择上级标签' }]}
      />
      <ProFormText
        label="标签名称"
        name={'tagName'}
        placeholder={'请输入标签名称'}
        initialValue={record?.tagName}
        rules={[
          { required: true, message: '请输入标签名称' },
          {
            max: 50,
            message: '输入标签名称最大长度为50',
          },
        ]}
      />
      <ProFormRadio.Group
        name={'type'}
        label="类型"
        valueEnum={{
          0: '父标签',
          1: '子标签',
        }}
        initialValue={`${record?.type}`}
        rules={[{ required: true, message: '请选择类型' }]}
      />
    </>
  );
});

export default EditBlogTagPage;
