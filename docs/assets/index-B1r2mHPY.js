/* empty css                  */ /* empty css                 */ import { u as p } from './useExitLogin-POkStVSO.js'
import {
  r as c,
  o as m,
  c as d,
  f as o,
  e as l,
  h as n,
  H as _,
  w as f,
  L as x,
  j as V,
} from './index-B8XG2sDH.js'
const L = {
  __name: 'index',
  setup(k) {
    const { exitLogin: a } = p(),
      e = c('')
    return (r, t) => {
      const s = x,
        u = V
      return (
        m(),
        d('div', null, [
          o(' i18测试 '),
          l(
            s,
            {
              modelValue: n(e),
              'onUpdate:modelValue':
                t[0] || (t[0] = (i) => (_(e) ? (e.value = i) : null)),
              placeholder: r.$t('role'),
            },
            null,
            8,
            ['modelValue', 'placeholder'],
          ),
          l(
            u,
            { plain: !0, onClick: n(a) },
            { default: f(() => [o('注销')]), _: 1 },
            8,
            ['onClick'],
          ),
        ])
      )
    }
  },
}
export { L as default }
