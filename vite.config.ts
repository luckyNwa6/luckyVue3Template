import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import path from 'path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import IconsResolver from 'unplugin-icons/resolver'
const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd())
  return {
    base: '/', // 在生产中服务时的基本公共路径
    publicDir: 'public', // 静态资源服务的文件夹, 默认"public"
    build: {
      outDir: 'dist',
    },
    //--------------------------------------
    resolve: {
      alias: {
        '@': pathSrc, // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //--------------------------------------
    css: {
      // CSS 预处理器,全局的scss格式如下往下面加即可
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `
              @use "./src/styles/variable.scss" as * ;
              `,
        },
      },
    },
    //---------------------------------------
    plugins: [
      vue(),
      UnoCSS({}),
      //---------------------------------------
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: [
          'vue',
          '@vueuse/core',
          'vue-router',
          // { '@/hooks/web/useI18n': ['useI18n'] },//还能这样每个vue页都导入
        ],
        // dts: '/auto-import.d.ts',
        eslintrc: {
          enabled: false, //  Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver({
            importStyle: 'sass',
          }),

          IconsResolver({
            prefix: 'Icon',
          }), // 自动导入图标组件
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, 'typings', 'auto-imports.d.ts'), //自动导包的存放路径
      }),
      //---------------------------------------
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ['ep'], //@iconify-json/ep 是 Element Plus 的图标库
          }),
          ElementPlusResolver(), // 自动导入 Element Plus 组件
        ],
        // dirs: ['src/components'], //自动导入这个目录下的组件.下面这个也会包含这个
        dts: path.resolve(pathSrc, 'typings', 'components.d.ts'),
      }),
      //---------------------------------------
      Icons({
        autoInstall: true, // 自动安装图标库
      }),
      //---------------------------------------
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')],
      }),
      //---------------------------------------
      createSvgIconsPlugin({
        // 阿里icon就放icons下了
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      //---------------------------------------
      viteMockServe({
        localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
        // localEnabled: false, //开发关闭
        // prodEnabled: false, //mock生产接口开关
      }),
    ],
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => {
            return path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
          },
        },
      },
    },
  }
})
