<template>
  <div>
    地图测试
    <exitButton />
    <hr />
    <el-card class="map-card">
      <div style="height: 316px; overflow: hidden">
        <baidu-map
          ref="map"
          :scroll-wheel-zoom="true"
          :center="mapCenter"
          :zoom="zoom"
          @ready="map_handler"
          api-version="3.0"
          ak="YCdK22Org07KZW3sdYtsCcU3FIPLkHvB"
          @moveend="syncCenterAndZoom"
        >
          <bm-view
            style="height: 316px; width: 100%; border-radius: 10px"
          ></bm-view>
          <div v-for="(marker, index) of markers" :key="index">
            <bm-marker
              :mass-clear="false"
              :icon="marker.icon"
              :position="{ lng: marker.position[0], lat: marker.position[1] }"
            ></bm-marker>
          </div>
        </baidu-map>
      </div>
    </el-card>
  </div>
</template>

<script setup>
const mapCenter = reactive({
  address: '',
  lng: '118.058319',
  lat: '24.613407',
})
const zoom = ref(15)
</script>

<style lang="scss" scoped></style>
