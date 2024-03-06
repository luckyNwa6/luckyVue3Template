<template>
  <div>
    <div class="mapBox">
      <BMap
        height="700px"
        :heading="60"
        :tilt="70"
        :center="{
          lng: 118.058301,
          lat: 24.613554,
        }"
        :zoom="19"
        :minZoom="3"
        :enableTraffic="true"
        :enableScrollWheelZoom="true"
        @initd="initMapFinish"
      >
        <BNavigation3d />
        <BMarker
          v-for="(item, index) in markers"
          :title="item.title"
          :position="item.position"
          :icon="`blue${(index + 1) as 1 | 2}`"
          @click="() => handleClick(item)"
          enableClicking
        />
        <BInfoWindow
          v-model:show="show"
          :position="position"
          :title="title"
          enableAutoPan
          enableCloseOnClick
          :offset="{
            x: 0,
            y: -10,
          }"
        >
          <div>
            {{ content }}
          </div>
        </BInfoWindow>
      </BMap>
    </div>
    <div class="textBox">当前所在地区：{{ cityName }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, UnwrapRef } from 'vue'
import { MapType, MapProps, useIpLocation } from 'vue3-baidu-map-gl'

const type = ref<MapType>('BMAP_NORMAL_MAP')
const mapSetting = ref<MapProps>({
  enableDragging: true,
  enableInertialDragging: true,
  enableScrollWheelZoom: false,
  enableContinuousZoom: true,
  enableResizeOnCenter: true,
  enableDoubleClickZoom: false,
  enableKeyboard: true,
  enablePinchToZoom: true,
  enableAutoResize: true,
  enableTraffic: false,
})
let cityName = ref('')
let count = ref(0)
let showTip = ref(true)
let markers = ref([
  {
    position: { lat: 24.613554, lng: 118.058301 },
    title: '地址一',
    content: '这是地址一的信息窗',
  },
  {
    position: { lat: 24.613854, lng: 118.058301 },
    title: '地址二',
    content: '这是地址二的信息窗',
  },
])
const title = ref(markers.value[0].title)
const position = ref(markers.value[0].position)
const content = ref(markers.value[0].content)
const show = ref<boolean>(false)
function handleClick(item: UnwrapRef<typeof markers>[0]) {
  position.value = item.position
  title.value = item.title
  show.value = true
}
const { get, location, isLoading } = useIpLocation((res) => {
  console.log('返回定位数据', res)
  cityName.value = res._rawValue.name
  // console.log('加载信息2', isLoading)
})
onMounted(() => {
  // console.log('加载信息1', isLoading)
})

const initMapFinish = () => {
  console.log('执行', location)
  get()
}
</script>
<style lang="scss" scoped>
.mapBox {
  height: calc(100vh - 200px);
}
.textBox {
  height: 200px;
  background: #f3f2f2;
}
</style>
