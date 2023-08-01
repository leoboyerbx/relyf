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

const { y: wScroll } = useWindowScroll()
const hideHeader = computed(() => wScroll.value > window.innerWidth * 0.35)

const drawerOpen = ref(false)

const deferedPrompt = ref()
onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferedPrompt.value = e
  })
  window.addEventListener('appinstalled', () => {
    deferedPrompt.value = null
  })
})
function installApp() {
  if (deferedPrompt.value) {
    deferedPrompt.value.prompt()
    deferedPrompt.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted')
        console.log('User accepted the install prompt')
      else
        console.log('User dismissed the install prompt')
    })
  }
}
</script>

<template>
  <VitePwaManifest />
  <main>
    <div class="fixed left-0 top-0 h-screen w-full">
      <div class="absolute inset-0 h-full w-full flex flex-col items-center justify-center gap-2 p-12 text-gray-400">
        <div class="h-6 w-6" i-svg-spinners:180-ring />
        <span>Chargement de la carte...</span>
      </div>
      <Map v-if="data" :data="data" :current-point="currentPoint" @open-point="openPoint" />
    </div>

    <transition name="fade">
      <header v-show="!hideHeader" class="fixed left-0 top-0 z-10 w-full flex items-center justify-between p-3">
        <button class="btn-square btn-neutral grid place-content-center text-2xl btn" @click="drawerOpen = true">
          <span i-uil:bars />
        </button>
        <transition name="fade">
          <button v-show="currentPoint" class="btn-square btn-neutral grid ml-auto place-content-center text-2xl btn" @click="currentPoint = null">
            <span i-uil:times />
          </button>
        </transition>
      </header>
    </transition>

    <transition name="actionsheet" mode="out-in">
      <div
        v-if="currentPoint"
        :key="currentPoint.gid"
        class="pointer-events-none relative z-10 mt-35vh h-full w-full px-2 pb-2"
      >
        <PointCard class="pointer-events-auto" :point="currentPoint" />
      </div>
    </transition>

    <aside
      class="bg-base-100 fixed left-0 top-0 z-20 h-full max-w-72 w-full flex flex-col transform gap-4 p-3 transition duration-300"
      :class="{ '-translate-x-full': !drawerOpen }"
    >
      <button class="btn-square btn-neutral grid place-content-center text-2xl btn" @click="drawerOpen = false">
        <span i-uil:times />
      </button>
      <header class="flex flex-col items-center justify-center gap-1">
        <img src="/shape.svg" alt="Logo" class="mb-2 w-10 opacity-50">
        <span class="font-bold">Relyf</span>
        <span class="text-sm font-thin italic">v0.1</span>
      </header>
      <ul class="menu w-full">
        <li>
          <button v-if="deferedPrompt" @click="installApp">
            <span i-uil:download-alt /> Installer
          </button>
        </li>
        <!--        <li> -->
        <!--          <a href="https://www.pnk.studio/" target="_blank">© Ponk <span i-uil:external-link-alt /></a> -->
        <!--        </li> -->
      </ul>
    </aside>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
