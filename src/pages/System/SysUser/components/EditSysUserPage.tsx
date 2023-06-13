import { SysUserType } from '@/repository/system/sysUser';
import { deleteOssFile } from '@/services/oss/ossService';
import { ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { Modal } from 'antd';
import { Rule } from 'antd/es/form';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import React, { useState } from 'react';

const phoneValidator: Rule = {
  pattern: /^1[3-9]\d{9}$/,
  message: '请输入正确的手机号',
};

interface Props {
  record?: SysUserType.SysUserVO;
}

const EditSysUserPage: React.FC<Props> = React.memo(({ record }) => {
  const isCreate = !record;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<any[]>(
    record?.headUrl
      ? [
          {
            uid: '-1',
            name: 'avatar.jpg',
            status: 'done',
            url: record?.headUrl,
          },
        ]
      : [],
  );

  const handlePreview = async (file: any) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList: newFileList }: UploadChangeParam) => {
    const lastFile = newFileList.slice(-1);
    setFileList(lastFile);
    if (lastFile && lastFile[0]?.response) {
    }
  };

  const handleRemove = async (file: UploadFile) => {
    await deleteOssFile({ fileName: file.response });
  };

  return (
    <>
      <ProFormText
        name="username"
        label="用户名"
        tooltip="输入用户名长度为4-20"
        placeholder="请输入用户名"
        rules={[
          { required: true, message: '请输入用户名' },
          {
            min: 4,
            max: 20,
            message: '输入用户名长度为4-20',
          },
        ]}
        initialValue={record?.username}
      />

      <ProFormText
        name="name"
        label="姓名"
        tooltip="输入姓名长度为4-20"
        placeholder="请输入姓名"
        rules={[
          { required: true, message: '请输入姓名' },
          {
            min: 4,
            max: 20,
            message: '输入姓名长度为4-20',
          },
        ]}
        initialValue={record?.name}
      />

      {isCreate && (
        <ProFormText.Password
          name="password"
          label="密码"
          tooltip="输入密码长度为6-10"
          placeholder="请输入密码"
          rules={[
            { required: true, message: '请输入密码' },
            {
              min: 6,
              max: 10,
              message: '输入密码长度为6-10',
            },
          ]}
        />
      )}

      <ProFormText
        name="phone"
        label="手机"
        placeholder="请输入手机号"
        rules={[phoneValidator]}
        initialValue={record?.phone}
      />

      <ProFormText
        name="description"
        label="描述"
        placeholder="请输入描述信息"
        initialValue={record?.description}
      />

      <ProFormUploadButton
        name="file"
        label="头像"
        max={1}
        action={'/api/manager-third-party/oss/uploadOssFile'}
        fieldProps={{
          name: 'file',
          fileList: fileList,
          listType: 'picture-card',
          onPreview: handlePreview,
          onChange: handleChange,
          onRemove: handleRemove,
        }}
      />
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
});

export default EditSysUserPage;
