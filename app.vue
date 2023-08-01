<script setup lang="ts">
import type { FeatureCollection } from 'geojson'
import { appName } from '~/constants'
import type { ToiletData } from '~/types/data'

useHead({
  title: appName,
})

const {
  data,
  pending,
} = useFetch<FeatureCollection>('https://data.grandlyon.com/geoserver/metropole-de-lyon/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:adr_voie_lieu.adrtoilettepublique_latest&outputFormat=application/json&SRSNAME=EPSG:4171&startIndex=0&sortBy=gid')

const currentPoint = ref()

function openPoint(point: ToiletData) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  currentPoint.value = point
}
</script>

<template>
  <VitePwaManifest />
  <main>
    <div class="fixed inset-0 h-screen w-full">
      <div class="absolute inset-0 h-full w-full flex flex-col items-center justify-center gap-2 p-12 text-gray-400">
        <div class="h-6 w-6" i-svg-spinners:180-ring />
        <span>Chargement de la carte...</span>
      </div>
      <Map v-if="data" :data="data" :current-point="currentPoint" @open-point="openPoint" />
    </div>

    <transition name="actionsheet" mode="out-in">
      <div
        v-if="currentPoint"
        :key="currentPoint.gid"
        class="pointer-events-none relative z-10 h-full w-full p-3 pt-[35vh]"
      >
        <PointCard class="pointer-events-auto" :point="currentPoint" />
      </div>
    </transition>
  </main>
</template>

<style>
.actionsheet-enter-active,
.actionsheet-leave-active {
  transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);
}

.actionsheet-enter-from,
.actionsheet-leave-to {
  @apply trabnsform translate-y-[70vh];
}
</style>
