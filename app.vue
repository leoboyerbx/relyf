<script setup lang="ts">
import type { FeatureCollection } from 'geojson'
import { appName } from '~/constants'
import type { ToiletData } from '~/types/data'

useHead({
  title: appName,
})

const { data, pending } = useFetch<FeatureCollection>('https://data.grandlyon.com/geoserver/metropole-de-lyon/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:adr_voie_lieu.adrtoilettepublique_latest&outputFormat=application/json&SRSNAME=EPSG:4171&startIndex=0&sortBy=gid')

const currentPoint = ref()
function openPoint(point: ToiletData) {
  currentPoint.value = point
}
</script>

<template>
  <VitePwaManifest />
  <main class="relative h-full w-full">
    <div class="absolute inset-0 h-full w-full flex flex-col items-center justify-center gap-2 p-12 text-gray-400">
      <div class="h-6 w-6" i-svg-spinners:180-ring />
      <span>Chargement de la carte...</span>
    </div>
    <Map v-if="data" :data="data" :current-point="currentPoint" @open-point="openPoint" />
    <button class="absolute right-0 top-0" @click="currentPoint = null">
      No
    </button>
  </main>
</template>

<style>
html, body, #__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
