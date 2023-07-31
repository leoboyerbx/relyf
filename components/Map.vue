<script lang="ts" setup="">
import 'mapbox-gl/dist/mapbox-gl.css'

import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvYm95ZXJieCIsImEiOiJjbGtyMWd4aWwxamprM3FwbHQ4cmZkemRmIn0.44F7SrV-wAk4HBOMV_XsMQ'

const mapContainer = ref()

onMounted(() => {
  const map = new mapboxgl.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  })
})
</script>

<template>
  <div ref="mapContainer" class="h-full w-full bg-red" />
</template>
