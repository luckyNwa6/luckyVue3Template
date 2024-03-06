/* empty css                 */ import {
  r,
  o as n,
  c as s,
  i as p,
  h as u,
  j as d,
  G as c,
  L as i,
} from './index-Wp8IaFhq.js'
const V = {
  __name: 'index',
  setup(m) {
    let e = r('')
    return (a, l) => {
      const t = i
      return (
        n(),
        s('div', null, [
          p(' i18测试 '),
          u(
            t,
            {
              modelValue: d(e),
              'onUpdate:modelValue':
                l[0] || (l[0] = (o) => (c(e) ? (e.value = o) : (e = o))),
              placeholder: a.$t('role'),
            },
            null,
            8,
            ['modelValue', 'placeholder'],
          ),
        ])
      )
    }
  },
}
export { V as default }
