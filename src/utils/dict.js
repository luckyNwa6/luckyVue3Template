/**
 * 数据字典工具类
 */
import useDictStore from '@/store/modules/dict'

const dictStore = useDictStore()

export const getDictOptions = (dictType) => {
  return dictStore.getDictByType(dictType) || []
}

export const getIntDictOptions = (dictType) => {
  // 获得通用的 DictDataType 列表
  const dictOptions = getDictOptions(dictType)
  // 转换成 number 类型的 NumberDictDataType 类型
  // why 需要特殊转换：避免 IDEA 在 v-for="dict in getIntDictOptions(...)" 时，el-option 的 key 会告警
  const dictOption = []
  dictOptions.forEach((dict) => {
    dictOption.push({
      ...dict,
      value: parseInt(dict.value + ''),
    })
  })
  return dictOption
}

export const getStrDictOptions = (dictType) => {
  const dictOption = []
  const dictOptions = getDictOptions(dictType)
  dictOptions.forEach((dict) => {
    dictOption.push({
      ...dict,
      value: dict.value + '',
    })
  })
  return dictOption
}

export const getBoolDictOptions = (dictType) => {
  const dictOption = []
  const dictOptions = getDictOptions(dictType)
  dictOptions.forEach((dict) => {
    dictOption.push({
      ...dict,
      value: dict.value + '' === 'true',
    })
  })
  return dictOption
}

/**
 * 获取指定字典类型的指定值对应的字典对象
 * @param dictType 字典类型
 * @param value 字典值
 * @return DictDataType 字典对象
 */
export const getDictObj = (dictType, value) => {
  const dictOptions = getDictOptions(dictType)
  for (const dict of dictOptions) {
    if (dict.value === value + '') {
      return dict
    }
  }
}

/**
 * 获得字典数据的文本展示
 *
 * @param dictType 字典类型
 * @param value 字典数据的值
 * @return 字典名称
 */
export const getDictLabel = (dictType, value) => {
  const dictOptions = getDictOptions(dictType)
  const dictLabel = ref('')
  dictOptions.forEach((dict) => {
    if (dict.value === value + '') {
      dictLabel.value = dict.label
    }
  })
  return dictLabel.value
}

export function getDictData(dictType, value) {
  // 获取 dictType 对应的数据字典数组
  const dictDatas = getDictDatas(dictType)
  // console.log('🚀 ~ getDictData ~ dictDatas:', dictDatas)
  if (!dictDatas || dictDatas.length === 0) {
    return ''
  }
  // 获取 value 对应的展示名
  value = value + '' // 强制转换成字符串，因为 DictData 小类数值，是字符串
  for (const dictData of dictDatas) {
    if (dictData.value === value) {
      return dictData
    }
  }
  return undefined
}

export function getDictDataLabel(dictType, value) {
  const dict = getDictData(dictType, value)
  return dict ? dict.label : ''
}

/**
 * 获取 dictType 对应的数据字典数组
 *
 * @param dictType 数据类型
 * @returns {*|Array} 数据字典数组
 */
export function getDictDatas(dictType) {
  // console.log('xxxxx', dictStore.getDictMap[dictType])
  return dictStore.getDictMap[dictType] || []
}

/**
 * 获取 dictType 对应的数据字典数组
 *
 * @param dictType 数据类型
 * @param values 数组、单个元素
 * @returns {*|Array} 数据字典数组
 */
export function getDictDatas2(dictType, values) {
  // console.log('进来了xxxssssssssssssssssssssssssssssxx', dictType, values)
  if (values === undefined) {
    return []
  }
  // 如果是单个元素，则转换成数组
  if (!Array.isArray(values)) {
    // console.log('xaaaaaaaaaaaaaaaaa')
    values = [values]
    // console.log('🚀 ~ getDictDatas2 ~ values:', values)
  }
  // 获得字典数据
  const results = []
  for (const value of values) {
    const dict = getDictData(dictType, value)
    if (dict) {
      results.push(dict)
    }
  }
  return results
}

export const DICT_TYPE = {
  // ========== SYSTEM 模块 ==========
  SYSTEM_USER_SEX: 'system_user_sex',
  SYSTEM_MENU_TYPE: 'system_menu_type',
  SYSTEM_ROLE_TYPE: 'system_role_type',
  SYSTEM_DATA_SCOPE: 'system_data_scope',
  SYSTEM_NOTICE_TYPE: 'system_notice_type',
  SYSTEM_OPERATE_TYPE: 'system_operate_type',
  SYSTEM_LOGIN_TYPE: 'system_login_type',
  SYSTEM_LOGIN_RESULT: 'system_login_result',
  SYSTEM_SMS_CHANNEL_CODE: 'system_sms_channel_code',
  SYSTEM_SMS_TEMPLATE_TYPE: 'system_sms_template_type',
  SYSTEM_SMS_SEND_STATUS: 'system_sms_send_status',
  SYSTEM_SMS_RECEIVE_STATUS: 'system_sms_receive_status',
  SYSTEM_ERROR_CODE_TYPE: 'system_error_code_type',
  SYSTEM_OAUTH2_GRANT_TYPE: 'system_oauth2_grant_type',
  SYSTEM_MAIL_SEND_STATUS: 'system_mail_send_status',
  SYSTEM_NOTIFY_TEMPLATE_TYPE: 'system_notify_template_type',
  // ========== 通用 模块 ==========

  COMMON_STATUS: 'common_status',
}
