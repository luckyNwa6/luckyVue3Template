/* empty css                  */ import { _ as N } from './lodash-BUJGpPod.js'
import {
  o as y,
  c as F,
  a as v,
  _ as G,
  s as ae,
  r as S,
  j as l,
  v as E,
  x as B,
  h as a,
  w as u,
  y as M,
  z as oe,
  i as k,
  t as z,
  l as Y,
  A as ne,
  B as le,
  C as se,
  D as R,
  G as re,
  H as D,
  m as ue,
  g as U,
  I as ie,
  d as de,
  u as ce,
  b as pe,
  J as me,
  K as ge,
  F as fe,
  L as _e,
  M as be,
  N as he,
  O as ve,
  P as we,
  Q as ye,
  R as Te,
  S as ke,
  T as Se,
  U as $e,
} from './index-DDmJ86zX.js'
import { r as Ee } from './request-BOxElYen.js'
/* empty css                 */ const Pe = {
    viewBox: '0 0 1024 1024',
    width: '1.2em',
    height: '1.2em',
  },
  Ne = v(
    'path',
    {
      fill: 'currentColor',
      d: 'M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z',
    },
    null,
    -1,
  ),
  Ce = [Ne]
function Ve(e, n) {
  return y(), F('svg', Pe, [...Ce])
}
const Me = { name: 'ep-arrow-down', render: Ve },
  ze = { class: 'flex flex-col h-full overflow-y-auto' },
  Be = { class: 'page-box h-0 flex-1 flex flex-col' },
  De = { class: 'flex pb-3' },
  Fe = { class: 'flex-1 search-form' },
  xe = { class: 'space-x-2 ml-2 flex button-area' },
  Ue = { class: 'pagination-box' },
  Ae = {
    __name: 'index',
    props: {
      permissionName: { type: String, default: '' },
      showToggleButton: { type: Boolean, default: !1 },
      toggleValue: { type: Boolean, default: !1 },
    },
    emits: ['update:toggleValue'],
    setup(e, { emit: n }) {
      const o = ae(),
        s = n,
        i = S(!1),
        m = () => {
          ;(i.value = !i.value), s('update:toggleValue', i.value)
        }
      return (t, g) => {
        const p = Me,
          c = Y,
          h = ne,
          w = le
        return (
          y(),
          F('div', ze, [
            v('div', Be, [
              l(o).promptContent
                ? E(t.$slots, 'promptContent', { key: 0 }, void 0, !0)
                : B('', !0),
              a(
                w,
                { class: 'search-card' },
                {
                  default: u(() => [
                    a(h, null, {
                      default: u(() => [
                        v('div', De, [
                          v('div', Fe, [
                            E(t.$slots, 'searchForm', {}, void 0, !0),
                          ]),
                          v('div', xe, [
                            v('div', null, [
                              e.showToggleButton
                                ? (y(),
                                  M(
                                    c,
                                    { key: 0, text: '', onClick: m },
                                    {
                                      default: u(() => [
                                        a(
                                          p,
                                          {
                                            class: oe([
                                              l(i) ? 'down-icon' : '',
                                              'change-icon mr-1',
                                            ]),
                                          },
                                          null,
                                          8,
                                          ['class'],
                                        ),
                                        k(' ' + z(l(i)), 1),
                                      ]),
                                      _: 1,
                                    },
                                  ))
                                : B('', !0),
                            ]),
                            E(t.$slots, 'searchButton', {}, void 0, !0),
                          ]),
                        ]),
                      ]),
                      _: 3,
                    }),
                  ]),
                  _: 3,
                },
              ),
              a(
                w,
                { class: 'table-card' },
                {
                  default: u(() => [
                    E(t.$slots, 'pageTable', {}, void 0, !0),
                    v('div', Ue, [
                      E(t.$slots, 'pagePagination', {}, void 0, !0),
                    ]),
                  ]),
                  _: 3,
                },
              ),
              E(t.$slots, 'default', {}, void 0, !0),
            ]),
          ])
        )
      }
    },
  },
  Oe = G(Ae, [['__scopeId', 'data-v-22208b01']]),
  Le = (e, n, o, s) => (
    (e /= s / 2),
    e < 1 ? (o / 2) * e * e + n : (e--, (-o / 2) * (e * (e - 2) - 1) + n)
  ),
  Re = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (e) {
        window.setTimeout(e, 1e3 / 60)
      }
    )
  })(),
  Ie = (e) => {
    ;(document.documentElement.scrollTop = e),
      (document.body.parentNode.scrollTop = e),
      (document.body.scrollTop = e)
  },
  je = () =>
    document.documentElement.scrollTop ||
    document.body.parentNode.scrollTop ||
    document.body.scrollTop,
  I = (e, n, o) => {
    const s = je(),
      i = e - s,
      m = 20
    let t = 0
    n = typeof n > 'u' ? 500 : n
    const g = function () {
      t += m
      const p = Le(t, s, i, n)
      Ie(p), t < n ? Re(g) : o && typeof o == 'function' && o()
    }
    g()
  }
var j
;(function (e) {
  ;(e.UP = 'UP'),
    (e.RIGHT = 'RIGHT'),
    (e.DOWN = 'DOWN'),
    (e.LEFT = 'LEFT'),
    (e.NONE = 'NONE')
})(j || (j = {}))
function q(e, n, o, s = {}) {
  var i
  const { passive: m = !1 } = s,
    t = se(),
    g =
      o ||
      (t == null ? void 0 : t.emit) ||
      ((i = t == null ? void 0 : t.$emit) === null || i === void 0
        ? void 0
        : i.bind(t))
  let p
  if ((n || (n = 'modelValue'), (p = p || `update:${n}`), m)) {
    const c = S(e[n])
    return (
      R(
        () => e[n],
        (h) => (c.value = h),
      ),
      R(c, (h) => {
        h !== e[n] && g(p, h)
      }),
      c
    )
  } else
    return re({
      get() {
        return e[n]
      },
      set(c) {
        g(p, c)
      },
    })
}
const qe = { class: 'pagination-content' },
  Ge = {
    __name: 'index',
    props: {
      total: { required: !0, type: Number, default: 0 },
      page: { type: Number, default: 1 },
      limit: { type: Number, default: 20 },
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50]
        },
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper',
      },
      background: { type: Boolean, default: !0 },
      autoScroll: { type: Boolean, default: !0 },
      hidden: { type: Boolean, default: !1 },
    },
    emits: ['pagination', 'update:page', 'update:limit'],
    setup(e, { emit: n }) {
      const o = e,
        s = n,
        i = q(o, 'page', s),
        m = q(o, 'limit', s)
      function t(p) {
        s('pagination', { page: i, limit: p }), o.autoScroll && I(0, 800)
      }
      function g(p) {
        ;(i.value = p),
          s('pagination', { page: p, limit: o.limit }),
          o.autoScroll && I(0, 800)
      }
      return (p, c) => {
        const h = ue
        return (
          y(),
          F('div', qe, [
            a(
              h,
              {
                'current-page': l(i),
                'onUpdate:currentPage':
                  c[0] || (c[0] = (w) => (D(i) ? (i.value = w) : null)),
                'page-size': l(m),
                'onUpdate:pageSize':
                  c[1] || (c[1] = (w) => (D(m) ? (m.value = w) : null)),
                background: e.background,
                layout: e.layout,
                'page-sizes': e.pageSizes,
                total: e.total,
                onSizeChange: t,
                onCurrentChange: g,
              },
              null,
              8,
              [
                'current-page',
                'page-size',
                'background',
                'layout',
                'page-sizes',
                'total',
              ],
            ),
          ])
        )
      }
    },
  },
  Ye = G(Ge, [['__scopeId', 'data-v-eae23a4f']])
function He(e, n) {
  const o = U(e()),
    s = U(e()),
    i = S(!1),
    m = S([]),
    t = S(0)
  function g(f) {
    if (f) return N.isFunction(f) && f()
    throw new Error('需要传递一个函数！例如：getTableData(fn)')
  }
  function p(f) {
    const $ = Object.keys(e())
    for (const _ in o)
      $.includes(_)
        ? ((o[_] = e()[_]), (s[_] = e()[_]))
        : (delete o[_], delete s[_])
    if (
      (n &&
        n.value &&
        ie(() => {
          n.value.clearSort()
        }),
      f)
    )
      return N.isFunction(f) && g(f)
    throw new Error('需要传递一个函数！例如：resetQueryTable(fn)')
  }
  function c(f, $, _) {
    const P = N.cloneDeep(f)
    if (((P[$.prop] = $.order), Object.assign(o, P), _))
      return N.isFunction(_) && g(_)
    throw new Error('需要传递一个函数！例如：sortTableByProps(fn)')
  }
  function h(f) {
    if (((o.pageNum = 1), f)) return N.isFunction(f) && g(f)
    throw new Error('需要传递一个函数！例如：changeTablePageSize(fn)')
  }
  function w(f) {
    Object.assign(o, s), g(f)
  }
  function x() {
    Object.assign(o, e()),
      Object.assign(s, e()),
      (i.value = !1),
      (m.value = []),
      (t.value = 0)
  }
  return {
    tableLoading: i,
    tableQueryData: o,
    searchData: s,
    tablePage: m,
    totalPages: t,
    hooks_getTableData: g,
    hooks_resetQueryTable: p,
    hooks_changeTablePageSize: h,
    hooks_sortTableByProps: c,
    hooks_handleSearch: w,
    hooks_resetAllData: x,
  }
}
const Qe = (e) => Ee.get('/home-list/page', { params: e }),
  Ke = v('hr', null, null, -1),
  We = { class: 'flex-1 w-full' },
  Je = { class: 'btn-content' },
  nt = de({
    __name: 'index',
    setup(e) {
      let n = ce()
      const o = S('tableRef'),
        s = S(!1),
        i = () => ({
          pageSize: 10,
          pageNum: 1,
          nickname: '',
          starEndDate: [],
          groupId: '',
          username: '',
          status: '',
          startDateTime: '',
          endDateTime: '',
        }),
        {
          tableQueryData: m,
          searchData: t,
          tableLoading: g,
          tablePage: p,
          totalPages: c,
          hooks_sortTableByProps: h,
          hooks_getTableData: w,
          hooks_resetQueryTable: x,
          hooks_handleSearch: f,
        } = He(i, o),
        $ = () => {
          n.push({ path: '/login' })
        }
      pe(() => {
        _()
      })
      const _ = async () => {
          g.value = !0
          try {
            const b = await Qe(m)
            console.log('🚀 ~ getTablePage ~ res:', b),
              (p.value = b.data.records),
              (c.value = b.data.total * 1)
          } catch {
            console.log('getTablePage error')
          }
          g.value = !1
        },
        P = () => {
          console.log('编辑')
        },
        H = U({ pageNum: 1, createdTimeSort: null }),
        Q = () => {
          h(H, null, _)
        }
      return (b, r) => {
        const C = Y,
          A = _e,
          V = be,
          K = he,
          O = ve,
          L = we,
          W = ye,
          T = Te,
          J = ke,
          X = Se,
          Z = Ye,
          ee = Oe,
          te = $e
        return (
          y(),
          F(
            fe,
            null,
            [
              a(
                C,
                { plain: !0, onClick: $ },
                { default: u(() => [k('注销')]), _: 1 },
              ),
              Ke,
              k(' 下面是组件的使用。首先是pagePack '),
              v('div', We, [
                a(
                  ee,
                  {
                    permissionName: 'USER_MANAGER_LIST_PAGE',
                    showToggleButton: '',
                    toggleValue: l(s),
                    'onUpdate:toggleValue':
                      r[11] || (r[11] = (d) => (D(s) ? (s.value = d) : null)),
                  },
                  {
                    searchForm: u(() => [
                      a(
                        O,
                        { gutter: 12 },
                        {
                          default: u(() => [
                            a(
                              V,
                              { span: 7 },
                              {
                                default: u(() => [
                                  a(
                                    A,
                                    {
                                      modelValue: l(t).username,
                                      'onUpdate:modelValue':
                                        r[0] ||
                                        (r[0] = (d) => (l(t).username = d)),
                                      placeholder: '请输入用户名',
                                      clearable: '',
                                    },
                                    null,
                                    8,
                                    ['modelValue'],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                            a(
                              V,
                              { span: 7 },
                              {
                                default: u(() => [
                                  a(
                                    A,
                                    {
                                      modelValue: l(t).nickname,
                                      'onUpdate:modelValue':
                                        r[1] ||
                                        (r[1] = (d) => (l(t).nickname = d)),
                                      placeholder: b.$t(
                                        'systemManager.userManager.username',
                                      ),
                                      clearable: '',
                                    },
                                    null,
                                    8,
                                    ['modelValue', 'placeholder'],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                            a(
                              V,
                              { span: 10 },
                              {
                                default: u(() => [
                                  a(
                                    K,
                                    {
                                      modelValue: l(t).starEndDate,
                                      'onUpdate:modelValue':
                                        r[2] ||
                                        (r[2] = (d) => (l(t).starEndDate = d)),
                                      type: 'daterange',
                                      'range-separator': '-',
                                      'start-placeholder': b.$t(
                                        'systemManager.userManager.startDate',
                                      ),
                                      'end-placeholder': b.$t(
                                        'systemManager.userManager.endDate',
                                      ),
                                      'value-format': 'YYYY-MM-DD',
                                    },
                                    null,
                                    8,
                                    [
                                      'modelValue',
                                      'start-placeholder',
                                      'end-placeholder',
                                    ],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                          ]),
                          _: 1,
                        },
                      ),
                      l(s)
                        ? (y(),
                          M(
                            O,
                            { key: 0, gutter: 12, class: 'mt-3' },
                            {
                              default: u(() => [
                                a(
                                  V,
                                  { span: 7 },
                                  {
                                    default: u(() => [
                                      a(
                                        W,
                                        {
                                          modelValue: l(t).status,
                                          'onUpdate:modelValue':
                                            r[3] ||
                                            (r[3] = (d) => (l(t).status = d)),
                                          placeholder: b.$t(
                                            'systemManager.userManager.status',
                                          ),
                                        },
                                        {
                                          default: u(() => [
                                            a(
                                              L,
                                              {
                                                value: 1,
                                                label: b.$t(
                                                  'systemManager.userManager.normal',
                                                ),
                                              },
                                              null,
                                              8,
                                              ['label'],
                                            ),
                                            a(
                                              L,
                                              {
                                                value: 0,
                                                label: b.$t(
                                                  'systemManager.userManager.disabled',
                                                ),
                                              },
                                              null,
                                              8,
                                              ['label'],
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ['modelValue', 'placeholder'],
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                ),
                              ]),
                              _: 1,
                            },
                          ))
                        : B('', !0),
                    ]),
                    searchButton: u(() => [
                      a(
                        C,
                        {
                          type: 'primary',
                          onClick: r[4] || (r[4] = (d) => l(f)(_)),
                        },
                        { default: u(() => [k(' 搜索 ')]), _: 1 },
                      ),
                      a(
                        C,
                        { onClick: r[5] || (r[5] = (d) => l(x)(_)) },
                        {
                          default: u(() => [k(z(b.$t('page.reset')), 1)]),
                          _: 1,
                        },
                      ),
                    ]),
                    pageTable: u(() => [
                      v('div', Je, [
                        a(
                          C,
                          {
                            icon: l(me),
                            type: 'primary',
                            onClick: r[6] || (r[6] = (d) => P()),
                          },
                          {
                            default: u(() => [k(z(b.$t('page.add')), 1)]),
                            _: 1,
                          },
                          8,
                          ['icon'],
                        ),
                      ]),
                      ge(
                        (y(),
                        M(
                          X,
                          {
                            ref_key: 'tableRef',
                            ref: o,
                            height: '100%',
                            data: l(p),
                            stripe: '',
                            'header-cell-style': {
                              background: '#FAFAFA',
                              color: '#333',
                            },
                            onSortChange: Q,
                          },
                          {
                            default: u(() => [
                              a(T, {
                                type: 'index',
                                width: '60',
                                label: '序号',
                                fixed: 'left',
                                align: 'center',
                              }),
                              a(
                                T,
                                {
                                  prop: 'username',
                                  label: b.$t(
                                    'systemManager.userManager.accountName',
                                  ),
                                  'show-overflow-tooltip': '',
                                  'min-width': '100',
                                },
                                null,
                                8,
                                ['label'],
                              ),
                              a(T, {
                                prop: 'nickname',
                                label: '姓名',
                                'show-overflow-tooltip': '',
                                'min-width': '100',
                              }),
                              a(T, {
                                prop: 'mobileNo',
                                label: '手机号',
                                'min-width': '130',
                                'show-overflow-tooltip': '',
                              }),
                              a(
                                T,
                                {
                                  prop: 'emailNo',
                                  label: b.$t('page.email'),
                                  'show-overflow-tooltip': '',
                                },
                                null,
                                8,
                                ['label'],
                              ),
                              a(
                                T,
                                {
                                  prop: 'createdTimeSort',
                                  sortable: 'custom',
                                  width: '150',
                                  label: '创建时间',
                                },
                                {
                                  default: u((d) => [
                                    v('span', null, z(d.row.createdTime), 1),
                                  ]),
                                  _: 1,
                                },
                              ),
                              a(
                                T,
                                { width: '210', label: '操作', fixed: 'right' },
                                {
                                  default: u((d) => [
                                    v('div', null, [
                                      a(
                                        J,
                                        {
                                          class: 'opreation-link',
                                          underline: !1,
                                          onClick: r[7] || (r[7] = (Xe) => P()),
                                        },
                                        {
                                          default: u(() => [k(' 编辑 ')]),
                                          _: 1,
                                        },
                                      ),
                                    ]),
                                  ]),
                                  _: 1,
                                },
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['data'],
                        )),
                        [[te, l(g)]],
                      ),
                    ]),
                    pagePagination: u(() => [
                      l(c) > 0
                        ? (y(),
                          M(
                            Z,
                            {
                              key: 0,
                              total: l(c),
                              'onUpdate:total':
                                r[8] ||
                                (r[8] = (d) => (D(c) ? (c.value = d) : null)),
                              page: l(m).pageNum,
                              'onUpdate:page':
                                r[9] || (r[9] = (d) => (l(m).pageNum = d)),
                              limit: l(m).pageSize,
                              'onUpdate:limit':
                                r[10] || (r[10] = (d) => (l(m).pageSize = d)),
                              onPagination: _,
                            },
                            null,
                            8,
                            ['total', 'page', 'limit'],
                          ))
                        : B('', !0),
                    ]),
                    _: 1,
                  },
                  8,
                  ['toggleValue'],
                ),
              ]),
            ],
            64,
          )
        )
      }
    },
  })
export { nt as default }
