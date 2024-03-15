import modal from './modal'
import download from './download'
// import { DICT_TYPE, getDictDataLabel, getDictDatas, getDictDatas2 } from '@/utils/dict'

export default {
  install(app) {
    // 模态框对象
    app.config.globalProperties.$modal = modal
    // 下载文件
    app.config.globalProperties.$download = download
    // 字典表扩展
    // app.config.globalProperties.DICT_TYPE = DICT_TYPE
    // app.config.globalProperties.getDictDataLabel = getDictDataLabel
    // app.config.globalProperties.getDictDatas = getDictDatas
    // app.config.globalProperties.getDictDatas2 = getDictDatas2
  },
}
