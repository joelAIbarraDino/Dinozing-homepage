<script setup>
import Imagen from './imagen.vue'
import Marquesina from './marquesina.vue'
import VideoDiferido from './videoDiferido.vue'

// Orden de la plantilla: cada fila intercala un video
const fila = (desde, hasta, video, despuesDe) => {
  const items = []
  for (let n = desde; n <= hasta; n++) {
    items.push({ imagen: `galeria-${n}` })
    if (n === despuesDe) items.push({ video })
  }
  return items
}
const filas = [fila(1, 14, 'galeria-a', 7), fila(15, 24, 'galeria-b', 21)]
</script>

<template>
  <section id="evidence">
    <h2 class="text-center uppercase">
      <span class="font-thunder block text-[100px] leading-[0.8] font-bold tracking-wide text-rosa lg:text-[230px] 2xl:text-[330px]" data-m-texto>Evidencia</span>
      <span class="font-thunder -mt-3 block text-[40px] leading-none font-bold text-verde lg:text-[60px]">Tangible</span>
    </h2>
    <div class="mt-12 space-y-5">
      <Marquesina v-for="(items, f) in filas" :key="f" :duracion="f ? 90 : 120" :inversa="!!f">
        <div v-for="(it, i) in items" :key="i" class="mr-5 h-50 w-75 shrink-0 overflow-hidden rounded-2xl lg:h-100 lg:w-130">
          <Imagen v-if="it.imagen" :nombre="it.imagen" alt="Evidencia de resultados de un proyecto de Dinozign" sizes="(min-width: 992px) 520px, 300px" class="size-full object-cover" />
          <VideoDiferido v-else :nombre="it.video" class="size-full object-cover" />
        </div>
      </Marquesina>
    </div>
  </section>
</template>
