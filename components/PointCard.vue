<script lang="ts" setup="">
import type { ToiletData } from '~/types/data'

const props = defineProps<{
  point: ToiletData
}>()

const webDisplay = computed(() => {
  if (props.point.web) {
    const url = new URL(props.point.web)
    return url.hostname.replace(/^www\./, '')
  }
  return ''
})

const isPaid = computed(() => {
  return props.point.payant && !(props.point.provenance.includes('ville de Lyon') || props.point.provenance.includes('ville de Caluire'))
})

const urlNavigateTo = computed(() => {
  const url = new URL('https://www.google.com/maps/dir/')
  url.searchParams.set('api', '1')
  url.searchParams.set('destination', `${props.point.coordinates[1]},${props.point.coordinates[0]}`)
  return url.toString()
})
const urlStreetView = computed(() => {
  const url = new URL('https://www.google.com/maps/embed/v1/streetview')
  url.searchParams.set('key', import.meta.env.VITE_APP_GMAP_APIKEY)
  url.searchParams.set('location', `${props.point.coordinates[1]},${props.point.coordinates[0]}`)
  return url.toString()
})
</script>

<template>
  <div class="card bg-base-100 min-h-full w-full shadow-xl">
    <header class="flex gap-0 px-4 py-2 text-gray-400">
      <div class="tooltip tooltip-top" data-tip="Toilettes">
        <button class="btn-circle btn-ghost flex items-center justify-center btn">
          <span class="" i-icon-park-solid:public-toilet />
        </button>
      </div>
      <div v-if="point.acceshandi" class="tooltip tooltip-top" data-tip="Accès PMR">
        <button class="btn-circle btn-ghost flex items-center justify-center btn">
          <span class="scale-110 transform" i-ic:round-wheelchair-pickup />
        </button>
      </div>
      <div v-if="isPaid" class="tooltip tooltip-top" data-tip="Payant">
        <button class="btn-circle btn-ghost flex items-center justify-center btn">
          <span class="scale-110 transform" i-ph:coins-bold />
        </button>
      </div>
    </header>
    <div class="card-body gap-0 px-6 py-4">
      <h2 class="card-title truncate">
        {{ point.adresse }}
      </h2>
      <span v-if="point.infoloc" class="font-light text-gray-400">{{ point.infoloc }}</span>
      <div class="mt-2 w-full flex items-center gap-2 overflow-x-auto">
        <a :href="urlNavigateTo" class="btn-neutral flex items-center gap-1 pr-3 btn">
          Itinéraire
          <span class="block scale-80 transform" i-material-symbols:directions />
        </a>
        <a v-if="point.web" :href="point.web" class="flex items-center gap-1 pr-3 btn">
          {{ webDisplay }}
          <span class="block scale-80 transform" i-uil:external-link-alt />
        </a>
      </div>

      <div>
        <h3>Street view</h3>
        <iframe :src="urlStreetView" class="h-64 w-full" />
      </div>

      <details class="mt-4">
        <summary>Infos brutes</summary>
        <div class="overflow-x-scroll">
          <pre>{{ point }}</pre>
        </div>
      </details>
    </div>
  </div>
</template>
