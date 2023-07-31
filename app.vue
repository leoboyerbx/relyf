<script setup lang="ts">
import type { FeatureCollection } from 'geojson'
import { appName } from '~/constants'

useHead({
  title: appName,
})

const { data, pending } = useFetch<FeatureCollection>('https://data.grandlyon.com/geoserver/metropole-de-lyon/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:adr_voie_lieu.adrtoilettepublique_latest&outputFormat=application/json&SRSNAME=EPSG:4171&startIndex=0&sortBy=gid')
</script>

<template>
  <VitePwaManifest />
  <main class="relative h-full w-full">
    <div class="absolute inset-0 h-full w-full flex flex-col items-center justify-center gap-2 p-12 text-gray-400">
      <div class="h-6 w-6" i-svg-spinners:180-ring />
      <span>Chargement de la carte...</span>
    </div>
    <Map v-if="data" :data="data" />
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
