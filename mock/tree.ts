export default [
  // 查询全部字典数据列表
  {
    url: '/api/zhsw/real_time_monitoring/getStationList', //请求地址
    method: 'get', //请求方式
    response: () => {
      return { code: 0, data: createdDict() }
    },
  },
]

// 表格数据
function createdDict() {
  return [
    {
      id: 295,
      label: '西安黑河',
      pid: '0',
      type: '0',
      nodeType: 'area',
      lng: null,
      lat: null,
    },
    {
      id: 304,
      label: '尤溪县分区',
      pid: '0',
      type: '0',
      nodeType: 'area',
      lng: 118.138658,
      lat: 26.178557,
    },
    {
      id: 305,
      label: '尤溪分区子分区',
      pid: '304',
      type: '0',
      nodeType: 'area',
      lng: 118.198516,
      lat: 26.184731,
    },
    {
      id: 306,
      label: '西安莲湖黑河分区名称超长名称超长名称超长名称超长名',
      pid: '0',
      type: '0',
      nodeType: 'area',
      lng: 108.923265,
      lat: 34.28615,
    },
    {
      id: 307,
      label: '莲湖黑河管理分区11111111111111111',
      pid: '306',
      type: '0',
      nodeType: 'area',
      lng: 108.94017,
      lat: 34.265648,
    },
    {
      id: 308,
      label: '莲湖黑河DMA分区名称超长名称超长名称超长名称超长',
      pid: '307',
      type: '0',
      nodeType: 'area',
      lng: 108.937338,
      lat: 34.268075,
    },
    {
      id: 311,
      label: '清风绿苑',
      pid: '0',
      type: '0',
      nodeType: 'area',
      lng: 118.055007,
      lat: 24.613389,
    },
    {
      id: 312,
      label: '清风绿苑1名称超长名称超长名称超长名称超长名称超长',
      pid: '311',
      type: '0',
      nodeType: 'area',
      lng: 118.05504,
      lat: 24.613412,
    },
    {
      id: 313,
      label: '清风绿苑2',
      pid: '312',
      type: '0',
      nodeType: 'area',
      lng: 118.055223,
      lat: 24.613995,
    },
    {
      id: 314,
      label: '清风绿苑3',
      pid: '313',
      type: '0',
      nodeType: 'area',
      lng: 118.055781,
      lat: 24.613959,
    },
    {
      id: 315,
      label: '清风绿苑DMA名称超长名称超长名称超长名称超长名称',
      pid: '314',
      type: '0',
      nodeType: 'area',
      lng: 118.055838,
      lat: 24.613736,
    },
    {
      id: 316,
      label: '清风绿苑DMA行政村',
      pid: '314',
      type: '0',
      nodeType: 'area',
      lng: null,
      lat: null,
    },
    {
      id: 317,
      label: '尤溪县2区',
      pid: '0',
      type: '0',
      nodeType: 'area',
      lng: null,
      lat: null,
    },
    {
      id: 318,
      label: '尤溪县2子分区',
      pid: '317',
      type: '0',
      nodeType: 'area',
      lng: null,
      lat: null,
    },
    {
      id: 477,
      label: '黑河汇流池',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 108.21235,
      lat: 34.054798,
    },
    {
      id: 479,
      label: '就峪径流测试搜索',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 108.277379,
      lat: 34.059029,
    },
    {
      id: 480,
      label: '田峪站',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 108.341538,
      lat: 34.062468,
    },
    {
      id: 486,
      label: '沣峪站',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 108.809578,
      lat: 34.034728,
    },
    {
      id: 487,
      label: '见子河站',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 108.896732,
      lat: 34.06922,
    },
    {
      id: 488,
      label: '甫店站',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 108.91234,
      lat: 34.070207,
    },
    {
      id: 489,
      label: '潏河站',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 108.937947,
      lat: 34.128227,
    },
    {
      id: 491,
      label: '西安黑河',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 118.058319,
      lat: 24.613407,
    },
    {
      id: 495,
      label: '站点名称超长名称超长名称超长名称超长名称超长名称超长名称超长名称超长名称超长名称超长名称超长名称超',
      pid: '306',
      type: '1',
      nodeType: '0',
      lng: 108.935407,
      lat: 34.260397,
    },
    {
      id: 497,
      label: '新增站点测试',
      pid: '304',
      type: '1',
      nodeType: '0',
      lng: 118.098779,
      lat: 24.597703,
    },
    {
      id: 498,
      label: '测站名称超长名称超长名称超长名称超长名称超长名称超',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 108.945549,
      lat: 34.347783,
    },
    {
      id: 502,
      label: '站点名称限制25字以内',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 118.123456,
      lat: 21.145632,
    },
    {
      id: 504,
      label: '综合测站导入',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 150.654321,
      lat: 145.123456,
    },
    {
      id: 513,
      label: '123',
      pid: '295',
      type: '1',
      nodeType: '0',
      lng: 1.0,
      lat: 3.0,
    },
  ]
}