<script setup>
import Marquesina from './marquesina.vue'

const frases = [
  '+200 NEGOCIOS IMPULSADOS',
  'AGENTES IA QUE RESPONDEN Y VENDEN POR WHATSAPP',
  '+65K USD GESTIONADOS EN ADS',
  'CAMPAÑAS QUE ATRAEN Y CONVIERTEN',
  'AUTOMATIZACIÓN SIN COMPLICACIONES',
  'SISTEMAS WEB HECHOS A LA MEDIDA',
  'RESULTADOS REALES, NO PROMESAS',
  'TECNOLOGÍA QUE ESCALA TU NEGOCIO 24/7',
]
const color = (i) => (i >= 5 ? '#141cd9' : '#f22daa')
</script>

<template>
  <section class="overflow-hidden" aria-label="Lo que hacemos">
    <svg width="0" height="0" class="absolute" aria-hidden="true">
      <symbol id="estrella" viewBox="0 0 98 98">
        <path fill="currentColor" d="M49 0C41.1522 0 34.79 6.36216 34.79 14.21V14.6941L34.448 14.3516C28.8982 8.80236 19.9014 8.80236 14.3516 14.3516C8.80236 19.9009 8.80236 28.8982 14.3516 34.448L14.6941 34.79H14.21C6.36216 34.79 0 41.1522 0 49C0 56.8478 6.36216 63.21 14.21 63.21H14.6941L14.3516 63.552C8.80236 69.1018 8.80236 78.0986 14.3516 83.6484C19.9009 89.1976 28.8982 89.1976 34.448 83.6484L34.79 83.3059V83.79C34.79 91.6378 41.1522 98 49 98C56.8478 98 63.21 91.6378 63.21 83.79V83.3059L63.5525 83.6484C69.1018 89.1976 78.0986 89.1976 83.6484 83.6484C89.1976 78.0986 89.1976 69.1018 83.6484 63.5525L83.3059 63.21H83.79C91.6378 63.21 98 56.8478 98 49C98 41.1522 91.6378 34.79 83.79 34.79H83.3059L83.6484 34.448C89.1976 28.8982 89.1976 19.9009 83.6484 14.3516C78.0986 8.80236 69.1018 8.80236 63.5525 14.3516L63.21 14.6941V14.21C63.21 6.36216 56.8478 0 49 0Z" />
      </symbol>
    </svg>
    <div class="bg-verde py-2 lg:py-8">
      <Marquesina :duracion="70">
        <div v-for="(frase, i) in frases" :key="i" class="flex shrink-0 items-center">
          <span class="font-thunder text-[70px] leading-none font-bold whitespace-nowrap text-white uppercase xl:text-[100px] 2xl:text-[140px]">{{ frase }}</span>
          <span class="relative mx-10 inline-flex size-16 shrink-0 items-center justify-center lg:size-24.5" aria-hidden="true">
            <svg class="size-full animate-spin-slow" :style="{ color: color(i) }"><use href="#estrella" /></svg>
            <span class="font-thunder absolute text-base leading-none font-bold text-white lg:text-2xl">RAWWR!</span>
          </span>
        </div>
      </Marquesina>
    </div>
    <div class="mt-2.5 space-y-2" aria-hidden="true">
      <div class="h-2.5 bg-verde" />
      <div class="h-2 bg-verde" />
      <div class="h-1.5 bg-verde" />
      <div class="h-1 bg-verde" />
      <div class="h-0.5 bg-verde" />
    </div>
  </section>
</template>
