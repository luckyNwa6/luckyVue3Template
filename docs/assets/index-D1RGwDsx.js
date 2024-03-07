/* empty css                  */ /* empty css                 */ import { u as p } from './useExitLogin-B-ziHzq2.js'
import {
  r as c,
  o as m,
  c as d,
  i as o,
  h as l,
  j as n,
  H as _,
  w as f,
  L as x,
  l as V,
} from './index-CfViZvwD.js'
const L = {
  __name: 'index',
  setup(k) {
    const { exitLogin: a } = p(),
      e = c('')
    return (r, t) => {
      const s = x,
        i = V
      return (
        m(),
        d('div', null, [
          o(' i18测试 '),
          l(
            s,
            {
              modelValue: n(e),
              'onUpdate:modelValue':
                t[0] || (t[0] = (u) => (_(e) ? (e.value = u) : null)),
              placeholder: r.$t('role'),
            },
            null,
            8,
            ['modelValue', 'placeholder'],
          ),
          l(
            i,
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
