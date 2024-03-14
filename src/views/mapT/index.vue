<template>
  <div>
    <exitButton />
    <hr />
    <div class="mapBox">
      <BMap
        height="700px"
        :heading="60"
        :tilt="70"
        :center="{
          lng: 118.058301,
          lat: 24.613554,
        }"
        :zoom="8"
        :minZoom="3"
        :enableTraffic="false"
        :enableScrollWheelZoom="true"
        @initd="initMapFinish"
      >
        <BScale />
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
        <BPolyline
          :path="polylinePath"
          stroke-color="#ff8800"
          :stroke-opacity="1"
          :stroke-weight="10"
          :enableEditing="false"
        />
        <BPolygon
          :enableEditing="false"
          :geodesic="true"
          :path="PolygonPath"
          stroke-color="#fa0"
          fillColor="#f70"
          :stroke-opacity="0.2"
          :stroke-weight="3"
        />
        <!-- <BLabel
          content="军事活动，禁止驶入"
          :position="{ lng: 119.1, lat: 24.039563 }"
          :style="{
            color: '#f00',
            backgroundColor: 'rgba(0,0,0,0)',
            border: 'none',
            padding: '5px 10px',
            fontSize: '20px',
          }"
        /> -->
        <BCircle
          v-for="itemC in circleList"
          stroke-style="dotted"
          :center="{ lat: itemC.lat, lng: itemC.lng }"
          :radius="itemC.radius"
          strokeColor="#f00"
          fillColor="#f00"
          :fillOpacity="0.1"
        />
      </BMap>
    </div>
    <div class="bg-red-300 mt-2 p-[20px]">当前所在地区：{{ cityName }}</div>
  </div>
</template>
<script setup lang="ts">
import { useIpLocation } from 'vue3-baidu-map-gl'

let cityName = ref('')

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
let polylinePath = ref([
  { lng: 118.058301, lat: 24.613554 },
  { lng: 120.191561, lat: 23.69932 },
])
let PolygonPath = ref([
  { lng: 118.41076, lat: 24.603296 },
  { lng: 120.48908, lat: 24.201566 },
  { lng: 120.056743, lat: 23.061642 },
  { lng: 118.019242, lat: 24.433389 },
])

let circleList = ref([
  {
    lng: 121.47391,
    lat: 25.571918,
    radius: 50000,
  },
  {
    lng: 122.69503,
    lat: 24.650596,
    radius: 90000,
  },
  {
    lng: 121.347428,
    lat: 21.673992,
    radius: 70000,
  },
  {
    lng: 119.63648,
    lat: 22.334535,
    radius: 100000,
  },
  {
    lng: 120.911642,
    lat: 25.003201,
    radius: 30000,
  },
])
const title = ref(markers.value[0].title)
const position = ref(markers.value[0].position)
const content = ref(markers.value[0].content)
const show = ref<boolean>(false)
function handleClick(item: any) {
  position.value = item.position
  title.value = item.title
  show.value = true
}
const { get, location, isLoading } = useIpLocation((res: any) => {
  console.log('返回定位数据', res)
  cityName.value = res._rawValue.name
  console.log('加载信息2', isLoading)
})
onMounted(() => {
  // console.log('加载信息1', isLoading)
})

const initMapFinish = () => {
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
