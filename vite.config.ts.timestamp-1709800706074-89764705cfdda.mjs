// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/vite@5.1.4_@types+node@20.11.24_sass@1.71.1/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.4_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import AutoImport from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@4.9.0/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import { viteMockServe } from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/vite-plugin-mock@3.0.1_esbuild@0.19.12_mockjs@1.1.0_vite@5.1.4/node_modules/vite-plugin-mock/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.1.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import Components from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import Icons from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/unplugin-icons@0.18.5/node_modules/unplugin-icons/dist/vite.js";
import VueI18nPlugin from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/@intlify+unplugin-vue-i18n@2.0.0_vue-i18n@9.10.1/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import IconsResolver from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/unplugin-icons@0.18.5/node_modules/unplugin-icons/dist/resolver.js";
import Unocss from "file:///E:/Test_zzh/vue3Demo/luckyDemoGit/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.35_vite@5.1.4/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "E:\\Test_zzh\\vue3Demo\\luckyDemoGit";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ command }) => {
  return {
    //--------------------------------------
    resolve: {
      alias: {
        "@": pathSrc
        // 相对路径别名配置，使用 @ 代替 src
      }
    },
    //--------------------------------------
    css: {
      // CSS 预处理器,全局的scss格式如下往下面加即可
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `
              @use "./src/styles/variable.scss" as * ;
              `
        }
      }
    },
    //---------------------------------------
    plugins: [
      vue(),
      //---------------------------------------
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: [
          "vue",
          "@vueuse/core",
          { "@/hooks/web/useI18n": ["useI18n"] }
        ],
        // dts: '/auto-import.d.ts',
        eslintrc: {
          enabled: false,
          //  Default `false`
          filepath: "./.eslintrc-auto-import.json",
          // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true
          // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver({
            importStyle: "sass"
          }),
          IconsResolver({
            prefix: "Icon"
          })
          // 自动导入图标组件
        ],
        vueTemplate: true,
        // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, "typings", "auto-imports.d.ts")
        //自动导包的存放路径
      }),
      Unocss({ configFile: "../uno.config.ts" }),
      //---------------------------------------
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ["ep"]
            //@iconify-json/ep 是 Element Plus 的图标库
          }),
          ElementPlusResolver()
          // 自动导入 Element Plus 组件
        ],
        // dirs: ['src/components'], //自动导入这个目录下的组件.下面这个也会包含这个
        dts: path.resolve(pathSrc, "typings", "components.d.ts")
      }),
      //---------------------------------------
      Icons({
        autoInstall: true
        // 自动安装图标库
      }),
      //---------------------------------------
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__vite_injected_original_dirname, "src/locales/**")]
      }),
      //---------------------------------------
      createSvgIconsPlugin({
        // 阿里icon就放icons下了
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      //---------------------------------------
      viteMockServe({
        localEnabled: command === "serve"
        //保证开发阶段可以使用mock接口
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxUZXN0X3p6aFxcXFx2dWUzRGVtb1xcXFxsdWNreURlbW9HaXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFRlc3RfenpoXFxcXHZ1ZTNEZW1vXFxcXGx1Y2t5RGVtb0dpdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovVGVzdF96emgvdnVlM0RlbW8vbHVja3lEZW1vR2l0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xyXG5pbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJ1xyXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcclxuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuY29uc3QgcGF0aFNyYyA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxyXG4vLyBleHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4vLyAgIHBsdWdpbnM6IFt2dWUoKSxjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbi8vICAgICAvLyBcdTk2M0ZcdTkxQ0NpY29uXHU1QzMxXHU2NTNFaWNvbnNcdTRFMEJcdTRFODZcclxuLy8gICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxyXG4vLyAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbi8vICAgfSldLFxyXG4vLyAgIHJlc29sdmU6IHtcclxuLy8gICAgIGFsaWFzOiB7XHJcbi8vICAgICAgICdAJzogcGF0aC5yZXNvbHZlKCcuL3NyYycpLCAvLyBcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdTUyMkJcdTU0MERcdTkxNERcdTdGNkVcdUZGMENcdTRGN0ZcdTc1MjggQCBcdTRFRTNcdTY2RkYgc3JjXHJcbi8vICAgICB9LFxyXG4vLyAgIH0sXHJcbi8vICAgIC8vc2Nzc1x1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1NEUwMFx1NEUyQVx1OTE0RFx1N0Y2RVxyXG4vLyAgIGNzczoge1xyXG4vLyAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4vLyAgICAgICBzY3NzOiB7XHJcbi8vICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXHJcbi8vICAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL3ZhcmlhYmxlLnNjc3NcIjsnLFxyXG4vLyAgICAgICB9LFxyXG4vLyAgICAgfSxcclxuLy8gICB9LFxyXG4vLyB9KVxyXG4vL1x1NjUzOVx1NjIxMFx1N0JBRFx1NTkzNFx1NTFGRFx1NjU3MFxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCB9KSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGhTcmMsIC8vIFx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFx1OTE0RFx1N0Y2RVx1RkYwQ1x1NEY3Rlx1NzUyOCBAIFx1NEVFM1x1NjZGRiBzcmNcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjc3M6IHtcclxuICAgICAgLy8gQ1NTIFx1OTg4NFx1NTkwNFx1NzQwNlx1NTY2OCxcdTUxNjhcdTVDNDBcdTc2ODRzY3NzXHU2ODNDXHU1RjBGXHU1OTgyXHU0RTBCXHU1RjgwXHU0RTBCXHU5NzYyXHU1MkEwXHU1MzczXHU1M0VGXHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXHJcbiAgICAgICAgICAgICAgQHVzZSBcIi4vc3JjL3N0eWxlcy92YXJpYWJsZS5zY3NzXCIgYXMgKiA7XHJcbiAgICAgICAgICAgICAgYCxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgVnVlIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFx1RkYwQ1x1NTk4Mlx1RkYxQXJlZiwgcmVhY3RpdmUsIHRvUmVmIFx1N0I0OVxyXG4gICAgICAgIGltcG9ydHM6IFtcclxuICAgICAgICAgICd2dWUnLFxyXG4gICAgICAgICAgJ0B2dWV1c2UvY29yZScsXHJcbiAgICAgICAgICB7ICdAL2hvb2tzL3dlYi91c2VJMThuJzogWyd1c2VJMThuJ10gfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIC8vIGR0czogJy9hdXRvLWltcG9ydC5kLnRzJyxcclxuICAgICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsIC8vICBEZWZhdWx0IGBmYWxzZWBcclxuICAgICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsIC8vIERlZmF1bHQgYC4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25gXHJcbiAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBEZWZhdWx0IGB0cnVlYCwgKHRydWUgfCBmYWxzZSB8ICdyZWFkb25seScgfCAncmVhZGFibGUnIHwgJ3dyaXRhYmxlJyB8ICd3cml0ZWFibGUnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFx1RkYwQ1x1NTk4Mlx1RkYxQUVsTWVzc2FnZSwgRWxNZXNzYWdlQm94Li4uIChcdTVFMjZcdTY4MzdcdTVGMEYpXHJcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKHtcclxuICAgICAgICAgICAgaW1wb3J0U3R5bGU6ICdzYXNzJyxcclxuICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICBwcmVmaXg6ICdJY29uJyxcclxuICAgICAgICAgIH0pLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcclxuICAgICAgICBdLFxyXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTU3MjggdnVlIFx1NkEyMVx1Njc3Rlx1NEUyRFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxyXG4gICAgICAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGhTcmMsICd0eXBpbmdzJywgJ2F1dG8taW1wb3J0cy5kLnRzJyksIC8vXHU4MUVBXHU1MkE4XHU1QkZDXHU1MzA1XHU3Njg0XHU1QjU4XHU2NTNFXHU4REVGXHU1Rjg0XHJcbiAgICAgIH0pLFxyXG4gICAgICBVbm9jc3MoeyBjb25maWdGaWxlOiAnLi4vdW5vLmNvbmZpZy50cycgfSksXHJcbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgICAgSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogWydlcCddLCAvL0BpY29uaWZ5LWpzb24vZXAgXHU2NjJGIEVsZW1lbnQgUGx1cyBcdTc2ODRcdTU2RkVcdTY4MDdcdTVFOTNcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1N0VDNFx1NEVGNlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgLy8gZGlyczogWydzcmMvY29tcG9uZW50cyddLCAvL1x1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1OEZEOVx1NEUyQVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NFx1N0VDNFx1NEVGNi5cdTRFMEJcdTk3NjJcdThGRDlcdTRFMkFcdTRFNUZcdTRGMUFcdTUzMDVcdTU0MkJcdThGRDlcdTRFMkFcclxuICAgICAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoU3JjLCAndHlwaW5ncycsICdjb21wb25lbnRzLmQudHMnKSxcclxuICAgICAgfSksXHJcbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgIEljb25zKHtcclxuICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZSwgLy8gXHU4MUVBXHU1MkE4XHU1Qjg5XHU4OEM1XHU1NkZFXHU2ODA3XHU1RTkzXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICBWdWVJMThuUGx1Z2luKHtcclxuICAgICAgICBydW50aW1lT25seTogdHJ1ZSxcclxuICAgICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXHJcbiAgICAgICAgaW5jbHVkZTogW3Jlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xvY2FsZXMvKionKV0sXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgLy8gXHU5NjNGXHU5MUNDaWNvblx1NUMzMVx1NjUzRWljb25zXHU0RTBCXHU0RTg2XHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICB2aXRlTW9ja1NlcnZlKHtcclxuICAgICAgICBsb2NhbEVuYWJsZWQ6IGNvbW1hbmQgPT09ICdzZXJ2ZScsIC8vXHU0RkREXHU4QkMxXHU1RjAwXHU1M0QxXHU5NjM2XHU2QkI1XHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4bW9ja1x1NjNBNVx1NTNFM1xyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZSLFNBQVMsZUFBZTtBQUNyVCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFlBQVk7QUFabkIsSUFBTSxtQ0FBbUM7QUFhekMsSUFBTSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBdUI3QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsTUFBTTtBQUMzQyxTQUFPO0FBQUE7QUFBQSxJQUVMLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUs7QUFBQTtBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLEtBQUs7QUFBQTtBQUFBLE1BRUgscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osbUJBQW1CO0FBQUEsVUFDbkIsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLFFBR2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBO0FBQUEsTUFFSixXQUFXO0FBQUE7QUFBQSxRQUVULFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0EsRUFBRSx1QkFBdUIsQ0FBQyxTQUFTLEVBQUU7QUFBQSxRQUN2QztBQUFBO0FBQUEsUUFFQSxVQUFVO0FBQUEsVUFDUixTQUFTO0FBQUE7QUFBQSxVQUNULFVBQVU7QUFBQTtBQUFBLFVBQ1Ysa0JBQWtCO0FBQUE7QUFBQSxRQUNwQjtBQUFBLFFBQ0EsV0FBVztBQUFBO0FBQUEsVUFFVCxvQkFBb0I7QUFBQSxZQUNsQixhQUFhO0FBQUEsVUFDZixDQUFDO0FBQUEsVUFFRCxjQUFjO0FBQUEsWUFDWixRQUFRO0FBQUEsVUFDVixDQUFDO0FBQUE7QUFBQSxRQUNIO0FBQUEsUUFDQSxhQUFhO0FBQUE7QUFBQSxRQUNiLEtBQUssS0FBSyxRQUFRLFNBQVMsV0FBVyxtQkFBbUI7QUFBQTtBQUFBLE1BQzNELENBQUM7QUFBQSxNQUNELE9BQU8sRUFBRSxZQUFZLG1CQUFtQixDQUFDO0FBQUE7QUFBQSxNQUV6QyxXQUFXO0FBQUEsUUFDVCxXQUFXO0FBQUEsVUFDVCxjQUFjO0FBQUEsWUFDWixvQkFBb0IsQ0FBQyxJQUFJO0FBQUE7QUFBQSxVQUMzQixDQUFDO0FBQUEsVUFDRCxvQkFBb0I7QUFBQTtBQUFBLFFBQ3RCO0FBQUE7QUFBQSxRQUVBLEtBQUssS0FBSyxRQUFRLFNBQVMsV0FBVyxpQkFBaUI7QUFBQSxNQUN6RCxDQUFDO0FBQUE7QUFBQSxNQUVELE1BQU07QUFBQSxRQUNKLGFBQWE7QUFBQTtBQUFBLE1BQ2YsQ0FBQztBQUFBO0FBQUEsTUFFRCxjQUFjO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixpQkFBaUI7QUFBQSxRQUNqQixTQUFTLENBQUMsUUFBUSxrQ0FBVyxnQkFBZ0IsQ0FBQztBQUFBLE1BQ2hELENBQUM7QUFBQTtBQUFBLE1BRUQscUJBQXFCO0FBQUE7QUFBQSxRQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBO0FBQUEsTUFFRCxjQUFjO0FBQUEsUUFDWixjQUFjLFlBQVk7QUFBQTtBQUFBLE1BQzVCLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
