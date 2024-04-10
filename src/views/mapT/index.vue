<template>
  <div>
    <baidu-map :center="center" class="map" :zoom="zoom" @ready="handler" scroll-wheel-zoom>
      <bml-marker-clusterer :averageCenter="true" :styles="styles">
        <bm-marker v-for="marker of markers" :key="marker" :position="{ lng: marker.lng, lat: marker.lat }"></bm-marker>
      </bml-marker-clusterer>
    </baidu-map>
    <button class="md-raised md-primary" @click="addMarker">添加一个随机点</button>
    <button class="md-raised md-primary" @click="removeMarker">删除上一个点</button>
    <button class="md-raised md-primary" @click="changeStyles">更换皮肤</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BmlMarkerClusterer } from 'vue-baidu-map-3x'
const center = ref({ lng: 0, lat: 0 })
const zoom = ref(13)

const handler = ({ BMap, map }) => {
  console.log(BMap, map)
  center.value.lng = 118.048689
  center.value.lat = 24.61794
  zoom.value = 15
}

const markers = ref([])
const styles = ref([])
const customStyles = ref(false)

const addMarker = () => {
  const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
  markers.value.push(position)
}

const updateMarker = ({ point }, marker) => {
  marker.lng = point.lng
  marker.lat = point.lat
}
const removeMarker = () => {
  markers.value.pop()
}
const changeStyles = () => {
  customStyles.value = !customStyles.value
  const EXAMPLE_URL = 'http://api.map.baidu.com/library/MarkerClusterer/1.2/examples/'
  const stylesArr = [
    {
      url: EXAMPLE_URL + 'images/heart30.png',
      size: {
        width: 30,
        height: 26,
      },
      opt_anchor: [16, 0],
      textColor: '#ff00ff',
      opt_textSize: 10,
    },
    {
      url: EXAMPLE_URL + 'images/heart40.png',
      size: {
        width: 40,
        height: 35,
      },
      opt_anchor: [40, 35],
      textColor: '#ff0000',
      opt_textSize: 12,
    },
    {
      url: EXAMPLE_URL + 'images/heart50.png',
      size: {
        width: 50,
        height: 44,
      },
      opt_anchor: [32, 0],
      textColor: 'white',
      opt_textSize: 14,
    },
  ]
  styles.value = customStyles.value ? stylesArr : []
}

const getMarkers = () => {
  for (let i = 0; i < 10; i++) {
    const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
    markers.value.push(position)
  }
}

getMarkers()
</script>
<style>
.map {
  width: 100%;
  height: 90vh;
}
</style>
