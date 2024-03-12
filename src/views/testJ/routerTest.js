//下面的代码复制到ctrl+n里面测试
const responseRoutes = [
  'aaa',
  'User',
  'Category',
  'Discount',
  'ActivityEdit',
  'CouponRule',
  'Product',
  'Activity',
  'CouponAdd',
  'Trademark',
  'test1',
  'Attr',
  'ActivityAdd',
  'ASD ',
  'CouponEdit',
  'OrderShow',
  '111',
  'Permission',
  'Spu',
  'UserList',
  'ClientUser',
  'Order',
  '33',
  "t't",
  'Coupon',
  'permision',
  'Acl',
  'ActivityRule',
  'Role',
  'RoleAuth',
  '222',
  'Refund',
  '1223',
  'x',
  'OrderList',
  'Sku',
]

const testRouter = [
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },
]

const constantRoute = [
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
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    name: 'home',
  },

  {
    path: '/iTest',
    component: () => import('@/views/iTest/index.vue'),
    name: 'iTest',
  },
]

function filterAsyncRoute(asnycRoute, routes) {
  return asnycRoute.filter((item) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

function deepCopy(obj) {
  // 如果传入的是基本数据类型，则直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  // 创建一个新的对象或数组
  const newObj = Array.isArray(obj) ? [] : {}
  // 遍历原对象的所有属性
  for (let key in obj) {
    // 如果属性是对象，则递归调用深拷贝函数
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[key] = deepCopy(obj[key])
    } else {
      // 否则直接复制属性值
      newObj[key] = obj[key]
    }
  }
  return newObj
}

const userAsyncRoute = filterAsyncRoute(deepCopy(testRouter), responseRoutes)
console.log(userAsyncRoute)
console.log('-------------------------------------')
const menuRoutes = [...constantRoute, ...userAsyncRoute]
console.log(menuRoutes)

//目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
// [...userAsyncRoute, anyRoute].forEach((route) => {
//   router.addRoute(route)
// })
