//createUserList:次函数执行会返回一个数组,数组里面包含两个用户信息
function createUserList() {
  return [
    {
      userId: 1,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}
//对外暴露一个数组:数组里面包含两个接口
//登录假的接口
//获取用户信息的假的接口
export default [
  // 用户登录接口
  {
    url: '/api/user/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(item => item.username === username && item.password === password)
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, message: '账号或者密码不正确' }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: request => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find(item => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } }
    },
  },
  //获取用户菜单权限等
  {
    url: '/api/admin/acl/index/info',
    method: 'get',
    response: request => {
      // console.log('🚀 ~ request:mock', request)

      //如果有返回成功信息
      return {
        code: 200,
        data: {
          routes: [
            'aaa',
            'User',
            'Category',
            'Discount',
            'ActivityEdit',
            'CouponRule',
            'Product',
            'product',
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
            '11',
            'Coupon',
            'permision',
            'Acl',
            'ActivityRule',
            'Role',
            'RoleAuth',
            '1',
            '222',
            'Refund',
            '1223',
            'x',
            'OrderList',
            'Sku',
            'testD',
          ],
          buttons: [
            'cuser.detail',
            'cuser.update',
            'cuser.delete',
            'btn.User.add',
            'btn.User.remove',
            'btn.User.update',
            'btn.User.assgin',
            'btn.Role.assgin',
            'btn.Role.add',
            'btn.Role.update',
            'btn.Role.remove',
            'btn.Permission.add',
            'btn.Permission.update',
            'btn.Permission.remove',
            'btn.Activity.add',
            'btn.Activity.update',
            'btn.Activity.rule',
            'btn.Coupon.add',
            'btn.Coupon.update',
            'btn.Coupon.rule',
            'btn.OrderList.detail',
            'btn.OrderList.Refund',
            'btn.UserList.lock',
            'btn.Category.add',
            'btn.Category.update',
            'btn.Category.remove',
            'btn.Trademark.add',
            'btn.Trademark.update',
            'btn.Trademark.remove',
            'btn.Attr.add',
            'btn.Attr.update',
            'btn.Attr.remove',
            'btn.Spu.add',
            'btn.Spu.addsku',
            'btn.Spu.update',
            'btn.Spu.skus',
            'btn.Spu.delete',
            'btn.Sku.updown',
            'btn.Sku.update',
            'btn.Sku.detail',
            'btn.Sku.remove',
            'btn.all',
            'btn.test.2',
            'aaabbb',
            '',
          ],
          roles: ['超级管理员', '普通員工'],
          name: 'admin',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        },
        msg: '成功',
      }
    },
  },
  //退出
  {
    url: '/api/admin/acl/index/logout',
    method: 'post',
    response: request => {
      //如果有返回成功信息
      // console.log('🚀 ~ request:mock+', request)
      return { code: 200, message: '成功', data: null, ok: true }
    },
  },
]
