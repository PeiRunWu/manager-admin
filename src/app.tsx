// 运行时配置
import Footer from '@/components/Footers';
import { GithubAction, Wechat } from '@/components/RightContent';
import AvatarDropdown from '@/components/RightContent/AvatarDropdown';
import * as AllIcons from '@ant-design/icons';
import { AlipayCircleFilled, GitlabFilled } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';
import {
  Settings as LayoutSettings,
  SettingDrawer,
} from '@ant-design/pro-components';

import { RunTimeLayoutConfig, history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import Icon from './components/Icon';
import { SysMenuType } from './repository/system/SysMenu';
import { SysUserType } from './repository/system/sysUser';
import { requestConfig } from './requestConfig';
import { queryCurrentUserMenus } from './services/system/sysMenuService';
import { queryCurrentUser } from './services/system/sysUserService';
import { getWithExpiry } from './utils/localStorage';

const loginPath = '/user/login';

const loopMenuItem = (menus: SysMenuType.MenuItem[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && <Icon name={icon as keyof typeof AllIcons} />,
    children: routes && loopMenuItem(routes),
  }));

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  currentUser?: SysUserType.CurrentUser;
  settings?: Partial<LayoutSettings>;
  fetchUserInfo?: () => Promise<SysUserType.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const response = await queryCurrentUser();
      return response.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const isLoggedIn = () => {
    return getWithExpiry('manager-admin') === 'true' || false;
  };

  const { location } = history;
  if (!isLoggedIn() && location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    menu: {
      locale: false,
      params: {
        userId: initialState?.currentUser?.id,
      },
      request: async (params, defaultMenuData) => {
        const menuData = await queryCurrentUserMenus();
        return loopMenuItem(menuData.data || []);
      },
    },

    avatarProps: {
      src: initialState?.currentUser?.headUrl,
      title: initialState?.currentUser?.username,
      render: (_: any, avatarChildren: any) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },

    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },

    actionsRender: () => [
      <GithubAction key="github" />,
      <GitlabFilled key="gitlabFilled" />,
      <Wechat key="wechatFilled" />,
      <AlipayCircleFilled key="alipayCircleFilled" />,
    ],

    footerRender: () => <Footer />,

    childrenRender: (children) => {
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings: Partial<LayoutSettings>) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...requestConfig,
};
