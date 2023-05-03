import Icon from '@/components/Icon';
import { SysMenuType } from '@/repository/system/SysMenu';
import { getAllTableItems } from '@/services/system/sysMenuService';
import * as Icons from '@ant-design/icons';
import {
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Space } from 'antd';
import React from 'react';

interface Props {
  record?: SysMenuType.SysMenuVO;
}

const EditSysMenuPage: React.FC<Props> = React.memo(({ record }) => {
  const iconList = Object.keys(Icons)
    .map((key) => ({
      name: key,
      component: Icons[key as keyof typeof Icons],
    }))
    .filter(
      (icon: any) =>
        typeof icon.component !== 'function' && icon.name !== 'default',
    );

  const iconOptions = iconList.map((item: any) => {
    return {
      value: item.name,
      label: (
        <Space>
          <Icon name={item.name} value={item.name} />
          {item.name}
        </Space>
      ),
    };
  });

  async function getExtendedMenuItems(record?: SysMenuType.SysMenuVO) {
    const response = await getAllTableItems();
    const menuItems = response.data.map((menu) => ({
      value: menu.id,
      label: menu.name,
    }));

    const staticOption = {
      label: '无上级目录',
      value: '0',
    };

    const filteredOptions = menuItems.filter(
      (option) => option.value !== record?.id,
    );

    return [staticOption, ...(record ? filteredOptions : menuItems)];
  }

  return (
    <>
      <ProFormSelect
        name={'parentId'}
        label="上级目录"
        initialValue={record?.parentId}
        request={() => getExtendedMenuItems(record)}
        rules={[{ required: true, message: '请选择上级目录' }]}
      />

      <ProFormText
        label="菜单名称"
        name={'name'}
        placeholder={'请输入菜单名称'}
        rules={[
          { required: true, message: '请输入菜单名称' },
          {
            max: 10,
            message: '输入菜单名称最大长度为10',
          },
        ]}
        initialValue={record?.name}
      />

      <ProFormSelect
        name={'icon'}
        label="前端图标"
        placeholder={'请选择图标'}
        initialValue={record?.icon}
        showSearch
        fieldProps={{
          filterOption: () => {
            return true;
          },
        }}
        debounceTime={300}
        request={async ({ keyWords = '' }) => {
          return iconOptions.filter(({ label }) => {
            return label.props.children[1].includes(keyWords);
          });
        }}
      />

      <ProFormText
        name={'path'}
        label="路由地址"
        tooltip=" 访问的路由地址，如：`sysUser`"
        placeholder={'请输入路由地址'}
        initialValue={record?.path}
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
      />

      <ProForm.Group>
        {!record && (
          <ProFormRadio.Group
            name={'hidden'}
            label="是否显示"
            valueEnum={{
              1: '隐藏',
              0: '显示',
            }}
            rules={[{ required: true, message: '请选择是否显示' }]}
          />
        )}

        <ProFormRadio.Group
          name={'type'}
          label="类型"
          valueEnum={{
            0: '目录',
            1: '菜单',
          }}
          initialValue={`${record?.type}`}
          rules={[{ required: true, message: '请选择类型' }]}
        />
      </ProForm.Group>
    </>
  );
});

export default EditSysMenuPage;
