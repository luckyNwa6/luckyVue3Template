import {
  u as b,
  _ as B,
  a as N,
  b as T,
  c as V,
} from './notification-PZZsso1-.js'
/* empty css                  */ import { u as j } from './user-BQUk4jFN.js'
/* empty css                 */ import {
  d as z,
  r as F,
  u as M,
  a as P,
  b as R,
  o as r,
  c as p,
  e as s,
  w as a,
  f as o,
  g as e,
  t as i,
  h as _,
  F as $,
  E as A,
  i as h,
  j as D,
  k as H,
  p as L,
  l as U,
  _ as q,
} from './index-B8XG2sDH.js'
const t = (n) => (L('data-v-6f0cd67e'), (n = n()), U(), n),
  G = t(() => e('hr', null, null, -1)),
  J = t(() => e('hr', null, null, -1)),
  K = t(() =>
    e('h1', null, '测试svg,用xlink:herf执行哪一个图标#icon-图标名称', -1),
  ),
  O = { style: { width: '30px', height: '30px' } },
  Q = t(() =>
    e('use', { 'xlink:href': '#icon-phone', fill: 'pink' }, null, -1),
  ),
  W = [Q],
  X = t(() => e('div', { class: 'testColor' }, 'lucky小维', -1)),
  Y = t(() => e('hr', null, null, -1)),
  Z = t(() => e('hr', null, null, -1)),
  ee = t(() => e('hr', null, null, -1)),
  te = t(() => e('hr', null, null, -1)),
  se = t(() => e('hr', null, null, -1)),
  oe = t(() => e('hr', null, null, -1)),
  ne = t(() => e('hr', null, null, -1)),
  le = z({
    __name: 'index',
    setup(n) {
      let d = j(),
        m = F('ref类似定义data里的值'),
        c = M()
      P()
      const { x: g, y: f } = b(),
        x = R({ username: 'admin', password: '111111' }),
        y = () => {
          A({ message: 'this is a message.', grouping: !0, type: 'success' })
        },
        k = () => {
          c.push({ path: '/i18T' })
        },
        v = async () => {
          try {
            await d.userLogin(x),
              c.push({ path: '/home' }),
              h({ type: 'success', message: '欢迎回来', title: 'HI' })
          } catch (u) {
            h({ type: 'error', message: u.message })
          }
        }
      return (u, ae) => {
        const l = D,
          S = H,
          w = B,
          C = N,
          E = T,
          I = V
        return (
          r(),
          p(
            $,
            null,
            [
              s(
                l,
                { type: 'primary', size: 'small', icon: 'plus' },
                { default: a(() => [o(' 编辑2种自动引入的方法应用 ')]), _: 1 },
              ),
              G,
              o(' 默认是英文的，需要main那修改配置 '),
              s(S, {
                'page-size': 100,
                layout: 'total, prev, pager, next',
                total: 1e3,
              }),
              J,
              K,
              (r(), p('svg', O, W)),
              s(w, { name: 'phone', color: 'blue' }),
              X,
              Y,
              e('div', null, i(_(m)), 1),
              Z,
              e(
                'div',
                null,
                ' hooks混入,也很好用：点击变化，当前x的值：' +
                  i(_(g)) +
                  ',当前y的值是：' +
                  i(_(f)),
                1,
              ),
              ee,
              s(C),
              te,
              o(' 这是elementui图标按需导入也不要注册,不过有前缀 '),
              s(E),
              s(I),
              se,
              o(' 这是elementui组件按需自动导入 '),
              s(
                l,
                { plain: !0, onClick: y },
                { default: a(() => [o('Show message')]), _: 1 },
              ),
              oe,
              o(' 这里测试mockjs模拟的数据 '),
              s(
                l,
                { plain: !0, onClick: v },
                { default: a(() => [o('登录')]), _: 1 },
              ),
              s(
                l,
                { plain: !0, onClick: k },
                { default: a(() => [o('牛逼i18n测试')]), _: 1 },
              ),
              ne,
            ],
            64,
          )
        )
      }
    },
  }),
  pe = q(le, [['__scopeId', 'data-v-6f0cd67e']])
export { pe as default }
