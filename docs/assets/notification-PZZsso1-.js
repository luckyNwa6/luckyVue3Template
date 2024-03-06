import {
  o,
  c as a,
  g as n,
  d as s,
  _ as l,
  n as r,
  r as i,
  m as d,
  q as _,
} from './index-B8XG2sDH.js'
const h = { viewBox: '0 0 1024 1024', width: '1.2em', height: '1.2em' },
  p = n(
    'path',
    {
      fill: 'currentColor',
      d: 'M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z',
    },
    null,
    -1,
  ),
  m = n(
    'path',
    {
      fill: 'currentColor',
      d: 'm469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z',
    },
    null,
    -1,
  ),
  f = [p, m]
function g(e, t) {
  return o(), a('svg', h, [...f])
}
const z = { name: 'ep-edit', render: g },
  v = { viewBox: '0 0 1024 1024', width: '1.2em', height: '1.2em' },
  x = n(
    'path',
    {
      fill: 'currentColor',
      d: 'M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32',
    },
    null,
    -1,
  ),
  C = n(
    'path',
    {
      fill: 'currentColor',
      d: 'M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416M512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544',
    },
    null,
    -1,
  ),
  $ = n(
    'path',
    {
      fill: 'currentColor',
      d: 'M544 384h96a32 32 0 1 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96v-96a32 32 0 0 1 64 0z',
    },
    null,
    -1,
  ),
  E = [x, C, $]
function M(e, t) {
  return o(), a('svg', v, [...E])
}
const L = { name: 'ep-add-location', render: M },
  w = s({
    setup() {
      return {}
    },
  })
function y(e, t, u, c, k, B) {
  return (
    o(), a('div', null, '****这是自动引入的主键，都不需要import也不用注册*****')
  )
}
const D = l(w, [
    ['render', y],
    ['__scopeId', 'data-v-32a426e5'],
  ]),
  F = ['xlink:href', 'fill'],
  q = s({
    __name: 'index',
    props: {
      prefix: { type: String, default: '#icon-' },
      name: String,
      color: { type: String, default: '' },
      width: { type: String, default: '16px' },
      height: { type: String, default: '16px' },
    },
    setup(e) {
      return (t, u) => (
        o(),
        a('div', null, [
          (o(),
          a(
            'svg',
            { style: r({ width: e.width, height: e.height }) },
            [
              n(
                'use',
                { 'xlink:href': e.prefix + e.name, fill: e.color },
                null,
                8,
                F,
              ),
            ],
            4,
          )),
        ])
      )
    },
  })
function H() {
  const e = i(0),
    t = i(0),
    u = (c) => {
      ;(e.value = c.pageX), (t.value = c.pageY)
    }
  return (
    d(() => {
      document.addEventListener('click', u)
    }),
    _(() => {
      document.removeEventListener('click', u)
    }),
    { x: e, y: t }
  )
}
export { q as _, D as a, L as b, z as c, H as u }
