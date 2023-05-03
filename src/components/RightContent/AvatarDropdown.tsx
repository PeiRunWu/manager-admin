import { outLogin } from '@/services/system/sysUserService';
import { removeWithExpiry } from '@/utils/localStorage';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Dropdown } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback } from 'react';
import { flushSync } from 'react-dom';

export type GlobalHeaderRightProps = {
  children?: React.ReactNode;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const { setInitialState } = useModel('@@initialState');

  const loginOut = async () => {
    await outLogin();
    removeWithExpiry('manager-admin');
    flushSync(() => {
      setInitialState((s) => ({
        ...s,
        currentUser: undefined,
      }));
    });
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        loginOut();
        return;
      }
    },
    [setInitialState],
  );

  return (
    <Dropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
      placement="top"
    >
      {children}
    </Dropdown>
  );
};

export default AvatarDropdown;
