import {
  o as a,
  c as i,
  a as e,
  d as m,
  _ as $,
  n as F,
  r as p,
  b as I,
  e as L,
  u as b,
  f as D,
  g as H,
  h as o,
  w as _,
  i as l,
  t as d,
  j as h,
  E as N,
  k as y,
  l as T,
  m as V,
  p as q,
  q as A,
} from './index-Wp8IaFhq.js'
/* empty css                 */ import { u as j } from './user-yjD0NYkO.js'
const P = { viewBox: '0 0 1024 1024', width: '1.2em', height: '1.2em' },
  R = e(
    'path',
    {
      fill: 'currentColor',
      d: 'M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32',
    },
    null,
    -1,
  ),
  U = e(
    'path',
    {
      fill: 'currentColor',
      d: 'M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416M512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544',
    },
    null,
    -1,
  ),
  X = e(
    'path',
    {
      fill: 'currentColor',
      d: 'M544 384h96a32 32 0 1 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96v-96a32 32 0 0 1 64 0z',
    },
    null,
    -1,
  ),
  Y = [R, U, X]
function G(t, s) {
  return a(), i('svg', P, [...Y])
}
const J = { name: 'ep-add-location', render: G },
  K = m({
    setup() {
      return {}
    },
  })
function O(t, s, c, u, f, g) {
  return (
    a(), i('div', null, '****这是自动引入的主键，都不需要import也不用注册*****')
  )
}
const Q = $(K, [
    ['render', O],
    ['__scopeId', 'data-v-32a426e5'],
  ]),
  W = ['xlink:href', 'fill'],
  Z = m({
    __name: 'index',
    props: {
      prefix: { type: String, default: '#icon-' },
      name: String,
      color: { type: String, default: '' },
      width: { type: String, default: '16px' },
      height: { type: String, default: '16px' },
    },
    setup(t) {
      return (s, c) => (
        a(),
        i('div', null, [
          (a(),
          i(
            'svg',
            { style: F({ width: t.width, height: t.height }) },
            [
              e(
                'use',
                { 'xlink:href': t.prefix + t.name, fill: t.color },
                null,
                8,
                W,
              ),
            ],
            4,
          )),
        ])
      )
    },
  }),
  ee = { viewBox: '0 0 1024 1024', width: '1.2em', height: '1.2em' },
  te = e(
    'path',
    {
      fill: 'currentColor',
      d: 'M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z',
    },
    null,
    -1,
  ),
  ne = e(
    'path',
    {
      fill: 'currentColor',
      d: 'm469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z',
    },
    null,
    -1,
  ),
  oe = [te, ne]
function se(t, s) {
  return a(), i('svg', ee, [...oe])
}
const le = { name: 'ep-edit', render: se }
function ae() {
  const t = p(0),
    s = p(0),
    c = (u) => {
      ;(t.value = u.pageX), (s.value = u.pageY)
    }
  return (
    I(() => {
      document.addEventListener('click', c)
    }),
    L(() => {
      document.removeEventListener('click', c)
    }),
    { x: t, y: s }
  )
}
const n = (t) => (q('data-v-7ab85ff6'), (t = t()), A(), t),
  ie = n(() => e('hr', null, null, -1)),
  ce = n(() => e('hr', null, null, -1)),
  ue = n(() =>
    e('h1', null, '测试svg,用xlink:herf执行哪一个图标#icon-图标名称', -1),
  ),
  re = { style: { width: '30px', height: '30px' } },
  _e = n(() =>
    e('use', { 'xlink:href': '#icon-phone', fill: 'pink' }, null, -1),
  ),
  de = [_e],
  he = n(() => e('div', { class: 'testColor' }, 'lucky小维', -1)),
  pe = n(() => e('hr', null, null, -1)),
  me = n(() => e('hr', null, null, -1)),
  fe = n(() => e('hr', null, null, -1)),
  ge = n(() => e('hr', null, null, -1)),
  ve = n(() => e('hr', null, null, -1)),
  xe = n(() => e('hr', null, null, -1)),
  ye = n(() => e('hr', null, null, -1)),
  $e = m({
    __name: 'index',
    setup(t) {
      let s = j(),
        c = p('ref类似定义data里的值'),
        u = b()
      D()
      const { x: f, y: g } = ae(),
        k = H({ username: 'admin', password: '111111' }),
        C = () => {
          N({ message: 'this is a message.', grouping: !0, type: 'success' })
        },
        E = () => {
          u.push({ path: '/iTest' })
        },
        w = async () => {
          try {
            await s.userLogin(k),
              u.push({ path: '/home' }),
              y({ type: 'success', message: '欢迎回来', title: 'HI' })
          } catch (v) {
            y({ type: 'error', message: v.message })
          }
        }
      return (v, ke) => {
        const x = le,
          r = T,
          S = V,
          M = Z,
          z = Q,
          B = J
        return (
          a(),
          i('div', null, [
            o(
              r,
              { type: 'primary', size: 'small' },
              { default: _(() => [o(x), l(' 编辑 ')]), _: 1 },
            ),
            ie,
            l(' 默认是英文的，需要main那修改配置 '),
            o(S, {
              'page-size': 100,
              layout: 'total, prev, pager, next',
              total: 1e3,
            }),
            ce,
            ue,
            (a(), i('svg', re, de)),
            o(M, { name: 'phone', color: 'blue' }),
            he,
            pe,
            e('div', null, d(h(c)), 1),
            me,
            e(
              'div',
              null,
              ' hooks混入,也很好用：点击变化，当前x的值：' +
                d(h(f)) +
                ',当前y的值是：' +
                d(h(g)),
              1,
            ),
            fe,
            o(z),
            ge,
            l(' 这是elementui图标按需导入也不要注册,不过有前缀 '),
            o(B),
            o(x),
            ve,
            l(' 这是elementui组件按需自动导入 '),
            o(
              r,
              { plain: !0, onClick: C },
              { default: _(() => [l('Show message')]), _: 1 },
            ),
            xe,
            l(' 这里测试mockjs模拟的数据 '),
            o(
              r,
              { plain: !0, onClick: w },
              { default: _(() => [l('登录')]), _: 1 },
            ),
            o(
              r,
              { plain: !0, onClick: E },
              { default: _(() => [l('牛逼i18n测试')]), _: 1 },
            ),
            ye,
          ])
        )
      }
    },
  }),
  Se = $($e, [['__scopeId', 'data-v-7ab85ff6']])
export { Se as default }
