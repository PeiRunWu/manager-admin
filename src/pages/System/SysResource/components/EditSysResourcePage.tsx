import { SysMenuType } from '@/repository/system/SysMenu';
import { getAllMenuItems } from '@/services/system/sysMenuService';
import {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import React from 'react';

interface Props {
  record?: SysMenuType.SysMenuVO;
}

const EditSysResourcePage: React.FC<Props> = React.memo(({ record }) => {
  return (
    <>
      <ProFormText
        label="资源名称"
        name={'name'}
        initialValue={record?.name}
        rules={[{ required: true, message: '请输入资源名称' }]}
      />
      <ProFormText
        label="资源路径"
        name={'path'}
        initialValue={record?.path}
        rules={[{ required: true, message: '请输入资源路径' }]}
      />
      <ProFormSelect
        name={'parentId'}
        label="资源分类"
        initialValue={record?.parentId}
        request={async () => {
          const response = await getAllMenuItems();
          const options = response.data.map((menu) => ({
            label: menu.name,
            value: menu.id,
          }));
          return options;
        }}
        rules={[{ required: true, message: '请选择资源分类' }]}
      />
      <ProFormDigit
        label="排序"
        name="sortValue"
        min={0}
        max={20}
        fieldProps={{
          keyboard: true,
        }}
        initialValue={record ? record.sortValue : 0}
        rules={[{ required: true, message: '请输入排序' }]}
      />
    </>
  );
});

export default EditSysResourcePage;
