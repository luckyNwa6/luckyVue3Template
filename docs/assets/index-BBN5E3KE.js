import {
  u as B,
  _ as N,
  a as T,
  b as V,
  c as j,
} from './notification-PZZsso1-.js'
/* empty css                  */ import { u as z } from './user-BQUk4jFN.js'
/* empty css                 */ import {
  d as F,
  r as M,
  u as P,
  a as R,
  b as $,
  o as r,
  c as p,
  e as s,
  w as l,
  f as o,
  g as e,
  t as c,
  h as _,
  F as A,
  E as D,
  i as h,
  j as H,
  k as L,
  p as U,
  l as q,
  _ as G,
} from './index-B8XG2sDH.js'
const t = (a) => (U('data-v-8f1dfdbd'), (a = a()), q(), a),
  J = t(() => e('hr', null, null, -1)),
  K = t(() => e('hr', null, null, -1)),
  O = t(() =>
    e('h1', null, '测试svg,用xlink:herf执行哪一个图标#icon-图标名称', -1),
  ),
  Q = { style: { width: '30px', height: '30px' } },
  W = t(() =>
    e('use', { 'xlink:href': '#icon-phone', fill: 'pink' }, null, -1),
  ),
  X = [W],
  Y = t(() => e('div', { class: 'testColor' }, 'lucky小维', -1)),
  Z = t(() => e('hr', null, null, -1)),
  ee = t(() => e('hr', null, null, -1)),
  te = t(() => e('hr', null, null, -1)),
  se = t(() => e('hr', null, null, -1)),
  oe = t(() => e('hr', null, null, -1)),
  ne = t(() => e('hr', null, null, -1)),
  le = t(() => e('hr', null, null, -1)),
  ae = F({
    __name: 'index',
    setup(a) {
      let d = z(),
        m = M('ref类似定义data里的值'),
        i = P()
      R()
      const { x: f, y: g } = B(),
        k = $({ username: 'admin', password: '111111' }),
        x = () => {
          D({ message: 'this is a message.', grouping: !0, type: 'success' })
        },
        y = () => {
          i.push({ path: '/i18T' })
        },
        v = () => {
          i.push({ path: '/chart' })
        },
        C = async () => {
          try {
            await d.userLogin(k),
              i.push({ path: '/home' }),
              h({ type: 'success', message: '欢迎回来', title: 'HI' })
          } catch (u) {
            h({ type: 'error', message: u.message })
          }
        }
      return (u, ie) => {
        const n = H,
          S = L,
          w = N,
          b = T,
          E = V,
          I = j
        return (
          r(),
          p(
            A,
            null,
            [
              s(
                n,
                { type: 'primary', size: 'small', icon: 'plus' },
                { default: l(() => [o(' 编辑2种自动引入的方法应用 ')]), _: 1 },
              ),
              J,
              o(' 默认是英文的，需要main那修改配置 '),
              s(S, {
                'page-size': 100,
                layout: 'total, prev, pager, next',
                total: 1e3,
              }),
              K,
              O,
              (r(), p('svg', Q, X)),
              s(w, { name: 'phone', color: 'blue' }),
              Y,
              Z,
              e('div', null, c(_(m)), 1),
              ee,
              e(
                'div',
                null,
                ' hooks混入,也很好用：点击变化，当前x的值：' +
                  c(_(f)) +
                  ',当前y的值是：' +
                  c(_(g)),
                1,
              ),
              te,
              s(b),
              se,
              o(' 这是elementui图标按需导入也不要注册,不过有前缀 '),
              s(E),
              s(I),
              oe,
              o(' 这是elementui组件按需自动导入 '),
              s(
                n,
                { plain: !0, onClick: x },
                { default: l(() => [o('Show message')]), _: 1 },
              ),
              ne,
              o(' 这里测试mockjs模拟的数据 '),
              s(
                n,
                { plain: !0, onClick: C },
                { default: l(() => [o('登录')]), _: 1 },
              ),
              s(
                n,
                { plain: !0, onClick: y },
                { default: l(() => [o('牛逼i18n测试')]), _: 1 },
              ),
              s(
                n,
                { plain: !0, onClick: v },
                { default: l(() => [o('echarts测试')]), _: 1 },
              ),
              le,
            ],
            64,
          )
        )
      }
    },
  }),
  he = G(ae, [['__scopeId', 'data-v-8f1dfdbd']])
export { he as default }
