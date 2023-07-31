<script lang="ts" setup="">
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import type { FeatureCollection } from 'geojson'

const props = defineProps<{
  data: FeatureCollection
}>()
const emit = defineEmits<{
  openPoint: []
}>()

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvYm95ZXJieCIsImEiOiJjbGtyMWd4aWwxamprM3FwbHQ4cmZkemRmIn0.44F7SrV-wAk4HBOMV_XsMQ'

const mapContainer = ref()

onMounted(async () => {
  const map = new mapboxgl.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [4.8374121, 45.7708948], // starting position [lng, lat]
    zoom: 12, // starting zoom
  })
  map.on('load', () => {
    map.addSource('toilets', {
      type: 'geojson',
      // Use a URL for the value for the `data` property.
      data: props.data,
    })

    map.addLayer({
      id: 'toilets-layer',
      type: 'circle',
      source: 'toilets',
      paint: {
        'circle-radius': 8,
        'circle-stroke-width': 2,
        'circle-color': '#3b78ea',
        'circle-stroke-color': 'white',
      },
    })
    map.on('click', 'toilets-layer', (e) => {
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice()
      const description = e.features[0].properties.description
      console.log(e.features[0])

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180)
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map)
    })
    map.on('mouseenter', 'toilets-layer', () => {
      map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'toilets-layer', () => {
      map.getCanvas().style.cursor = ''
    })
  })
})
</script>

<template>
  <div ref="mapContainer" class="relative h-full w-full" />
</template>
