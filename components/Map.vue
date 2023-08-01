<script lang="ts" setup="">
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import type { FeatureCollection } from 'geojson'
import type { ToiletData } from '~/types/data'

const props = defineProps<{
  data: FeatureCollection
  currentPoint?: ToiletData | null
}>()
const emit = defineEmits<{
  openPoint: [point: ToiletData]
}>()

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvYm95ZXJieCIsImEiOiJjbGtyMWd4aWwxamprM3FwbHQ4cmZkemRmIn0.44F7SrV-wAk4HBOMV_XsMQ'

const mapContainer = ref()
let map: mapboxgl.Map
onMounted(async () => {
  map = new mapboxgl.Map({
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
        'circle-color': '#4f14ee',
        'circle-stroke-color': 'white',
      },
    })
    map.on('click', 'toilets-layer', (e) => {
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice()
      const properties = e.features[0].properties

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180)
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360

      emit('openPoint', {
        coordinates,
        ...properties,
      } as ToiletData)
    })
    map.on('mouseenter', 'toilets-layer', () => {
      map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'toilets-layer', () => {
      map.getCanvas().style.cursor = ''
    })
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    }), 'bottom-right')
  })
})

const lastMapStatus = ref()
watch(() => props.currentPoint, (point) => {
  if (point) {
    if (!lastMapStatus.value) {
      lastMapStatus.value = {
        center: map.getCenter(),
        zoom: map.getZoom(),
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      }
    }
    map.easeTo({
      center: point.coordinates,
      zoom: 16,
      padding: {
        bottom: window.innerHeight * 0.62,
        top: 0,
        left: 0,
        right: 0,
      },
    })
  }
  else if (lastMapStatus.value) {
    map.easeTo(lastMapStatus.value)
    lastMapStatus.value = null
  }
})
</script>

<template>
  <div ref="mapContainer" class="relative h-full w-full" />
</template>

<style lang="scss">
.mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib {
  @apply hidden;
}
.mapboxgl-ctrl-group {
  @apply \!shadow-none filter-invert hue-rotate-180 saturate-50 brightness-80 p-2.5;
}
</style>
