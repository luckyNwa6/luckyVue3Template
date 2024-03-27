//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },

  {
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
]

//异步路由
export const asnycRoute = [
  {
    path: '/sys',
    component: () => import('@/layout/index.vue'),
    name: 'Sys',
    meta: {
      title: '系统管理',
      icon: 'Setting',
    },
    redirect: '/sys/user',
    children: [
      {
        path: '/sys/user',
        component: () => import('@/views/sys/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/sys/role',
        component: () => import('@/views/sys/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/sys/menu',
        component: () => import('@/views/sys/menu/index.vue'),
        name: 'Menu',
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/lucky',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '测试',
      icon: 'StarFilled',
    },
    redirect: '/lucky/testD',
    children: [
      {
        path: '/lucky/testD',
        component: () => import('@/views/lucky/testD/index.vue'),
        name: 'TableD',
        meta: {
          title: '表格管理',
          icon: 'StarFilled',
        },
      },
      {
        path: '/lucky/mapView',
        component: () => import('@/views/lucky/mapView/index.vue'),
        name: 'MapView',
        meta: {
          title: '可视化地图',
          icon: 'StarFilled',
        },
      },
      {
        path: '/lucky/chartS',
        component: () => import('@/views/lucky/chartS/index.vue'),
        name: 'ChartS',
        meta: {
          title: '图表',
          icon: 'StarFilled',
        },
      },
      {
        path: '/lucky/tabD',
        component: () => import('@/views/lucky/tabD/index.vue'),
        name: 'tabD',
        meta: {
          title: 'tab测试',
          icon: 'StarFilled',
        },
      },
    ],
  },
]

//任意路由
export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}
