import {
  o as c,
  c as i,
  a as e,
  d as g,
  _ as y,
  n as L,
  r as f,
  b as q,
  e as D,
  u as H,
  f as N,
  g as T,
  h as o,
  w as _,
  i as s,
  t as d,
  j as p,
  F as V,
  E as b,
  k as m,
  l as A,
  m as X,
  p as j,
  q as P,
} from './index-DDmJ86zX.js'
/* empty css                  */ import {
  r as R,
  u as U,
} from './request-BOxElYen.js'
/* empty css                 */ const Y = {
    viewBox: '0 0 1024 1024',
    width: '1.2em',
    height: '1.2em',
  },
  G = e(
    'path',
    {
      fill: 'currentColor',
      d: 'M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z',
    },
    null,
    -1,
  ),
  J = e(
    'path',
    {
      fill: 'currentColor',
      d: 'm469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z',
    },
    null,
    -1,
  ),
  K = [G, J]
function O(t, l) {
  return c(), i('svg', Y, [...K])
}
const Q = { name: 'ep-edit', render: O },
  W = { viewBox: '0 0 1024 1024', width: '1.2em', height: '1.2em' },
  Z = e(
    'path',
    {
      fill: 'currentColor',
      d: 'M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32',
    },
    null,
    -1,
  ),
  ee = e(
    'path',
    {
      fill: 'currentColor',
      d: 'M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416M512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544',
    },
    null,
    -1,
  ),
  te = e(
    'path',
    {
      fill: 'currentColor',
      d: 'M544 384h96a32 32 0 1 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96v-96a32 32 0 0 1 64 0z',
    },
    null,
    -1,
  ),
  ne = [Z, ee, te]
function oe(t, l) {
  return c(), i('svg', W, [...ne])
}
const se = { name: 'ep-add-location', render: oe },
  le = g({
    setup() {
      return {}
    },
  })
function ae(t, l, u, a, v, x) {
  return (
    c(), i('div', null, '****这是自动引入的主键，都不需要import也不用注册*****')
  )
}
const ce = y(le, [
    ['render', ae],
    ['__scopeId', 'data-v-32a426e5'],
  ]),
  ie = ['xlink:href', 'fill'],
  ue = g({
    __name: 'index',
    props: {
      prefix: { type: String, default: '#icon-' },
      name: String,
      color: { type: String, default: '' },
      width: { type: String, default: '16px' },
      height: { type: String, default: '16px' },
    },
    setup(t) {
      return (l, u) => (
        c(),
        i('div', null, [
          (c(),
          i(
            'svg',
            { style: L({ width: t.width, height: t.height }) },
            [
              e(
                'use',
                { 'xlink:href': t.prefix + t.name, fill: t.color },
                null,
                8,
                ie,
              ),
            ],
            4,
          )),
        ])
      )
    },
  }),
  re = (t) => R.post('/idpSys/login', t)
function _e() {
  const t = f(0),
    l = f(0),
    u = (a) => {
      ;(t.value = a.pageX), (l.value = a.pageY)
    }
  return (
    q(() => {
      document.addEventListener('click', u)
    }),
    D(() => {
      document.removeEventListener('click', u)
    }),
    { x: t, y: l }
  )
}
const n = (t) => (j('data-v-75ccec45'), (t = t()), P(), t),
  he = n(() => e('hr', null, null, -1)),
  de = n(() => e('hr', null, null, -1)),
  pe = n(() =>
    e('h1', null, '测试svg,用xlink:herf执行哪一个图标#icon-图标名称', -1),
  ),
  me = { style: { width: '30px', height: '30px' } },
  fe = n(() =>
    e('use', { 'xlink:href': '#icon-phone', fill: 'pink' }, null, -1),
  ),
  ge = [fe],
  ve = n(() => e('div', { class: 'testColor' }, 'lucky小维', -1)),
  xe = n(() => e('hr', null, null, -1)),
  ye = n(() => e('hr', null, null, -1)),
  ke = n(() => e('hr', null, null, -1)),
  Ce = n(() => e('hr', null, null, -1)),
  $e = n(() => e('hr', null, null, -1)),
  we = n(() => e('hr', null, null, -1)),
  Ee = n(() => e('hr', null, null, -1)),
  Se = g({
    __name: 'index',
    setup(t) {
      let l = U(),
        u = f('ref类似定义data里的值'),
        a = H()
      N()
      const { x: v, y: x } = _e(),
        k = T({ username: 'admin', password: '111111' }),
        C = () => {
          b({ message: 'this is a message.', grouping: !0, type: 'success' })
        },
        $ = () => {
          a.push({ path: '/i18T' })
        },
        w = () => {
          a.push({ path: '/chart' })
        },
        E = () => {
          re({
            acc: 'luckyNwa',
            captcha: '',
            openCaptcha: !1,
            pwd: 'nwa999',
            uuid: '',
          }).then((h) => {
            console.log(h),
              h.code === 0 &&
                m({ type: 'success', message: '登录成功!', title: 'HI，小维' })
          })
        },
        S = async () => {
          try {
            await l.userLogin(k),
              a.push({ path: '/home' }),
              m({ type: 'success', message: '欢迎回来', title: 'HI' })
          } catch (h) {
            m({ type: 'error', message: h.message })
          }
        }
      return (h, Me) => {
        const r = A,
          M = X,
          F = ue,
          I = ce,
          z = se,
          B = Q
        return (
          c(),
          i(
            V,
            null,
            [
              o(
                r,
                { type: 'primary', size: 'small', icon: 'plus' },
                { default: _(() => [s(' 编辑2种自动引入的方法应用 ')]), _: 1 },
              ),
              he,
              s(' 默认是英文的，需要main那修改配置 '),
              o(M, {
                'page-size': 100,
                layout: 'total, prev, pager, next',
                total: 1e3,
              }),
              de,
              pe,
              (c(), i('svg', me, ge)),
              o(F, { name: 'phone', color: 'blue' }),
              ve,
              xe,
              e('div', null, d(p(u)), 1),
              ye,
              e(
                'div',
                null,
                ' hooks混入,也很好用：点击变化，当前x的值：' +
                  d(p(v)) +
                  ',当前y的值是：' +
                  d(p(x)),
                1,
              ),
              ke,
              o(I),
              Ce,
              s(' 这是elementui图标按需导入也不要注册,不过有前缀 '),
              o(z),
              o(B),
              $e,
              s(' 这是elementui组件按需自动导入 '),
              o(
                r,
                { plain: !0, onClick: C },
                { default: _(() => [s('Show message')]), _: 1 },
              ),
              we,
              s(' 这里测试mockjs模拟的数据 '),
              o(
                r,
                { plain: !0, onClick: S },
                { default: _(() => [s('Mock登录测试')]), _: 1 },
              ),
              o(
                r,
                { plain: !0, onClick: E },
                { default: _(() => [s('线上登录测试')]), _: 1 },
              ),
              o(
                r,
                { plain: !0, onClick: $ },
                { default: _(() => [s('牛逼i18n测试')]), _: 1 },
              ),
              o(
                r,
                { plain: !0, onClick: w },
                { default: _(() => [s('echarts测试')]), _: 1 },
              ),
              Ee,
            ],
            64,
          )
        )
      }
    },
  }),
  Le = y(Se, [['__scopeId', 'data-v-75ccec45']])
export { Le as default }
