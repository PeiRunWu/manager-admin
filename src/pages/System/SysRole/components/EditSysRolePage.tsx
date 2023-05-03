/* eslint-disable react-hooks/exhaustive-deps */
import { SysRoleType } from '@/repository/system/SysRole';
import { ProFormText } from '@ant-design/pro-components';
import React, { FC } from 'react';

interface Props {
  record?: SysRoleType.SysRole;
}

const EditSysRolePage: FC<Props> = React.memo((record) => {
  return (
    <>
      <ProFormText
        name={'roleName'}
        label="角色名称"
        placeholder={'请输入角色名称'}
        tooltip="输入角色名称长度为4-20"
        rules={[
          { required: true, message: '请输入角色名称' },
          {
            min: 4,
            max: 20,
            message: '输入角色名称长度为4-20',
          },
        ]}
        initialValue={record?.record?.roleName}
      />
      <ProFormText
        name={'roleCode'}
        label="角色编码"
        placeholder={'请输入角色编码'}
        tooltip="输入角色编码长度为4-20"
        rules={[
          { required: true, message: '请输入角色编码' },
          {
            min: 4,
            max: 20,
            message: '输入角色名称长度为4-20',
          },
        ]}
        initialValue={record?.record?.roleCode}
      />
      <ProFormText
        name={'description'}
        label="描述"
        placeholder={'请输入描述信息'}
        tooltip="输入角色编码最大长度为200"
        rules={[
          {
            max: 200,
            message: '输入描述最大长度为200',
          },
        ]}
        initialValue={record?.record?.description}
      />
    </>
  );
});

export default EditSysRolePage;
