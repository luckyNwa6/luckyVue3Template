<template>
  <div style="display: flex; height: 100vh">
    <!-- 左边 -->
    <div style="width: 10%; background: pink">
      <exitButton />
      <div v-for="(item, index) in markers">
        <span>{{ item.icon }}</span>
        <img :src="getAssetsFile('yd_4.png')" />
        ||
        <span>{{ index }}</span>
      </div>
      <div class="bg-red-300 mt-2 p-[20px]">当前所在地区：{{ cityName }}</div>
    </div>
    <!-- 右边 -->
    <div style="width: 90%; height: 100vh">
      <BMap
        height="815px"
        :center="{
          lng: 118.058301,
          lat: 24.613554,
        }"
        :zoom="18"
        :minZoom="3"
        :enableScrollWheelZoom="true"
        @initd="initMapFinish"
      >
        <BMarker
          v-for="(item, index) in markers"
          :key="index"
          :position="item.position"
          :icon="{
            imageUrl: getAssetsFile(item.icon),
            imageSize: item.size,
          }"
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
  </div>
</template>
<script setup lang="ts">
import { useIpLocation } from 'vue3-baidu-map-gl'
import * as mapv from 'mapv'
import * as mapvgl from 'mapvgl'

let cityName = ref('')

const getAssetsFile = (url: string) => {
  let imgH = new URL(`/src/assets/home/${url}`, window.location.href).href
  return imgH
}

let markers = ref([
  {
    position: { lat: 24.613554, lng: 118.058301 },
    title: '地址一',
    content: '这是地址一的信息窗',
    icon: 'yd_4.png',
    size: {
      width: 100,
      height: 100,
    },
  },
  {
    position: { lat: 24.613854, lng: 118.058301 },
    title: '地址二',
    content: '这是地址二的信息窗',
    icon: 'yd_3.png',
    size: {
      width: 100,
      height: 100,
    },
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
<style lang="scss" scoped></style>
