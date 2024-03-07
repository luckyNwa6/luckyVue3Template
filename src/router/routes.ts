//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/iTest/login/index.vue'),
    name: 'login',
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: () => import('@/views/iTest/home/index.vue'),
    name: 'home',
  },

  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'DataLine',
    },
  },
  {
    path: '/map',
    component: () => import('@/views/map/index.vue'),
    name: 'map',
  },
]

//异步路由  性能优化
// export const asnycRoute = [

//   },
// ]

//测试路由    同级index.ts再设置一下
export const testRoute = [
  {
    path: '/i18T',
    component: () => import('@/views/iTest/i18T/index.vue'),
    name: 'i18T',
  },
  {
    path: '/chart',
    component: () => import('@/views/iTest/chart/index.vue'),
    name: 'chart',
  },
  {
    path: '/unoCssT',
    component: () => import('@/views/iTest/unoCssT/index.vue'),
    name: 'unoCssT',
  },
]
