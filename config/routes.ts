export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  // {
  //   path: '/system',
  //   name: '系统管理',
  //   icon: 'SettingOutlined',
  //   routes: [
  //     {
  //       path: 'sysUser/list',
  //       name: '用户管理',
  //       component: './System/SysUser',
  //     },
  //     {
  //       path: 'sysRole/list',
  //       name: '角色管理',
  //       component: './System/SysRole',
  //     },
  //     {
  //       path: 'sysResource/list',
  //       name: '权限管理',
  //       component: './System/SysResource',
  //     },
  //     {
  //       path: '/system/sysMenu/assignAuth',
  //       component: './System/AssignMenu',
  //     },
  //   ],
  // },
  { path: '/system', redirect: '/system/sysUser/list' },
  {
    path: '/system/sysUser/list',
    component: './System/SysUser',
  },
  {
    path: '/system/sysRole/list',
    component: './System/SysRole',
  },
  {
    path: '/system/sysMenu/assignAuth',
    component: './System/AssignMenu',
  },
  {
    path: '/system/sysMenu/list',
    component: './System/SysMenu',
  },
  {
    path: '/system/sysResource/list',
    component: './System/SysResource',
  },
  { path: '/blog', redirect: '/blog/tag/list' },
  {
    path: '/blog/tag/list',
    component: './Blog/Tag',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
