import { SysUserType } from '@/repository/system/sysUser';
import { login } from '@/services/system/sysUserService';
import { setWithExpiry } from '@/utils/localStorage';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((initialState) => ({
          ...initialState,
          currentUser: userInfo,
        }));
      });
    }
  };

  const doUserLogin = async (values: SysUserType.LoginParams) => {
    const hide = message.loading('登录中');
    try {
      const response = await login(values);
      if (response.code === 200) {
        message.success('登入成功');
        setWithExpiry(
          'manager-admin',
          response.data.access_token,
          3600 * 24 * 1000,
        );
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
    } catch (e: any) {
      message.error(e.message);
    } finally {
      hide();
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        style={{
          height: '100vh',
          background:
            'url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)',
          backgroundSize: '100% 100%',
          padding: '32px 0 24px',
        }}
      >
        <LoginForm<SysUserType.LoginParams>
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Manage-Admin"
          subTitle="后台服务代码平台"
          onFinish={async (formData) => {
            await doUserLogin(formData);
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'用户名: admin'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'密码: admin'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default Login;
