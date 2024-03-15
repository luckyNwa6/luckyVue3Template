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
  console.log('🚀 ~ getDictData ~ dictDatas:', dictDatas)
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
  if (values === undefined) {
    return []
  }
  // 如果是单个元素，则转换成数组
  if (!Array.isArray(values)) {
    values = [this.value]
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
  USER_TYPE: 'user_type',
  COMMON_STATUS: 'common_status',
  TERMINAL: 'terminal',

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

  // ========== INFRA 模块 ==========
  INFRA_BOOLEAN_STRING: 'infra_boolean_string',
  INFRA_REDIS_TIMEOUT_TYPE: 'infra_redis_timeout_type',
  INFRA_JOB_STATUS: 'infra_job_status',
  INFRA_JOB_LOG_STATUS: 'infra_job_log_status',
  INFRA_API_ERROR_LOG_PROCESS_STATUS: 'infra_api_error_log_process_status',
  INFRA_CONFIG_TYPE: 'infra_config_type',
  INFRA_CODEGEN_TEMPLATE_TYPE: 'infra_codegen_template_type',
  INFRA_CODEGEN_SCENE: 'infra_codegen_scene',
  INFRA_FILE_STORAGE: 'infra_file_storage',

  // ========== BPM 模块 ==========
  BPM_MODEL_CATEGORY: 'bpm_model_category',
  BPM_MODEL_FORM_TYPE: 'bpm_model_form_type',
  BPM_TASK_ASSIGN_RULE_TYPE: 'bpm_task_assign_rule_type',
  BPM_PROCESS_INSTANCE_STATUS: 'bpm_process_instance_status',
  BPM_PROCESS_INSTANCE_RESULT: 'bpm_process_instance_result',
  BPM_TASK_ASSIGN_SCRIPT: 'bpm_task_assign_script',
  BPM_OA_LEAVE_TYPE: 'bpm_oa_leave_type',

  // ========== PAY 模块 ==========
  PAY_CHANNEL_WECHAT_VERSION: 'pay_channel_wechat_version', // 微信渠道版本
  PAY_CHANNEL_ALIPAY_SIGN_TYPE: 'pay_channel_alipay_sign_type', // 支付渠道支付宝算法类型
  PAY_CHANNEL_ALIPAY_MODE: 'pay_channel_alipay_mode', // 支付宝公钥类型
  PAY_CHANNEL_ALIPAY_SERVER_TYPE: 'pay_channel_alipay_server_type', // 支付宝网关地址
  PAY_CHANNEL_CODE_TYPE: 'pay_channel_code_type', // 支付渠道编码类型
  PAY_ORDER_NOTIFY_STATUS: 'pay_order_notify_status', // 商户支付订单回调状态
  PAY_ORDER_STATUS: 'pay_order_status', // 商户支付订单状态
  PAY_ORDER_REFUND_STATUS: 'pay_order_refund_status', // 商户支付订单退款状态
  PAY_REFUND_ORDER_STATUS: 'pay_refund_order_status', // 退款订单状态
  PAY_REFUND_ORDER_TYPE: 'pay_refund_order_type', // 退款订单类别

  // ========== MP 模块 ==========
  MP_AUTO_REPLY_REQUEST_MATCH: 'mp_auto_reply_request_match', // 自动回复请求匹配类型
  MP_MESSAGE_TYPE: 'mp_message_type', // 消息类型

  // ========== MALL - PRODUCT 模块 ==========
  PRODUCT_SPU_STATUS: 'product_spu_status', // 商品 SPU 状态

  // ========== MALL - ORDER 模块 ==========
  TRADE_AFTER_SALE_STATUS: 'trade_after_sale_status', // 售后 - 状态
  TRADE_AFTER_SALE_WAY: 'trade_after_sale_way', // 售后 - 方式
  TRADE_AFTER_SALE_TYPE: 'trade_after_sale_type', // 售后 - 类型
  TRADE_ORDER_TYPE: 'trade_order_type', // 订单 - 类型
  TRADE_ORDER_STATUS: 'trade_order_status', // 订单 - 状态
  TRADE_ORDER_ITEM_AFTER_SALE_STATUS: 'trade_order_item_after_sale_status', // 订单项 - 售后状态

  // ========== MALL - PROMOTION 模块 ==========
  PROMOTION_DISCOUNT_TYPE: 'promotion_discount_type', // 优惠类型
  PROMOTION_PRODUCT_SCOPE: 'promotion_product_scope', // 营销的商品范围
  PROMOTION_COUPON_TEMPLATE_VALIDITY_TYPE: 'promotion_coupon_template_validity_type', // 优惠劵模板的有限期类型
  PROMOTION_COUPON_STATUS: 'promotion_coupon_status', // 优惠劵的状态
  PROMOTION_COUPON_TAKE_TYPE: 'promotion_coupon_take_type', // 优惠劵的领取方式
  PROMOTION_ACTIVITY_STATUS: 'promotion_activity_status', // 优惠活动的状态
  PROMOTION_CONDITION_TYPE: 'promotion_condition_type', // 营销的条件类型枚举

  // ========== zhsw 模块 ==========
  ZHSW_STATION_TYPE: 'zhsw_station_type', // 站点类型
  ZHSW_PRODUCT_TYPE: 'zhsw_product_type', // 产品类型
  ZHSW_COMMUNICATION_PROTOCOL: 'zhsw_communication_protocol', // 产品协议
  ZHSW_DEVICE_TYPE: 'zhsw_device_type', // 设备类型
  ZHSW_DEVICE_STATE: 'zhsw_device_state', // 设备状态
  ZHSW_STATION_LEVEL: 'zhsw_station_level', // 站点等级
  ZHSW_PARTITION_TYPE: 'zhsw_partition_type', // 分区类型
  ZHSW_DEVICE_MODEL: 'zhsw_device_model', // 设备型号
  ZHSW_DEVICE_INSTALL_STATE: 'zhsw_device_install_state', // 设备安装状态
  ZHSW_INDUSTRY_TYPE: 'zhsw_industry_type', //行业类型
  ZHSW_FACTOR_TYPE: 'factor_type', //因子类型
  ZHSW_FACTOR_LEVEL: 'zhsw_factor_level', //因子等级
  ZHSW_ELEMENT_DATA_TYPE: 'zhsw_element_data_type', //要素数据类型
  ZHSW_FACTOR_COMMON_STATUS: 'zhsw_factor_common_status',
  ZHSW_DEVICE_INSTALL_LEAKAGE_ENVIRONMENT: 'zhsw_device_install_leakage_environment', // 噪声安装环境
  ZHSW_DEVICE_INSTALL_PRESSURE_ENVIRONMENT: 'zhsw_device_install_pressure_environment', // 压力安装环境
  ZHSW_DEVICE_INSTALL_PIPE: 'zhsw_device_install_pipe', // 管材
  ZHSW_FACTOR_COMMON_STATUS: 'zhsw_factor_common_status',
  ZHSW_ORDER: 'zhsw_order', //排序方式
  ZHSW_DMA_TYPE: 'zhsw_dma_type', // DMA分区类型
  ZHSW_ALARM_TYPE_DATA: 'zhsw_alarm_type_data', // 数据报警类型
  ZHSW_ALARM_DEVICE_LEVEL: 'zhsw_alarm_device_level', // 设备报警级别
  ZHSW_ALARM_RECORD_STATE: 'zhsw_alarm_record_state', // 报警状态
  ZHSW_ALARM_HANDLE_STATE: 'zhsw_alarm_handle_state', // 处理状态
  ZHSW_ALARM_DATA_LEVEL: 'zhsw_alarm_data_level', // 数据报警等级
  ZHSW_ALARM_TYPE_DEVICE: 'zhsw_alarm_type_device', // 设备报警类型
  ZHSW_ALARM_TRIGGER_MODE: 'zhsw_alarm_trigger_mode', // 触发方式
  ZHSW_ALARM_STATE: 'zhsw_alarm_state', // 设备报警规则状态
  ZHSW_DEVICE_INSTALL_STATUS: 'zhsw_device_install_state', // 安装状态
  ZHSW_EXEC_STATE: 'zhsw_exec_state', // 执行列表
}
