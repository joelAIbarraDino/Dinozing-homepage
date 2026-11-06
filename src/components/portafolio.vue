<script setup>
import { onMounted, useTemplateRef } from 'vue'
import Imagen from './imagen.vue'
import { portafolio } from '@/data/sitio'

const paneles = useTemplateRef('paneles')

// El efecto de agua se descarga la primera vez que el cursor entra a un panel
onMounted(() => {
  if (!matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
  paneles.value.forEach((panel) => {
    panel.addEventListener('pointerenter', (evento) => {
      import('@/lib/ondas.js').then(({ crearOndas }) => crearOndas(panel, evento))
    }, { once: true })
  })
})
</script>

<template>
  <section>
    <h2 class="font-thunder px-6 text-center text-[61px] leading-none font-bold text-rosa uppercase md:text-[90px] 2xl:text-[150px]">
      +200 negocios en México y USA ya confían
    </h2>
    <div class="mt-19 px-3 md:px-9" data-m-portafolio>
      <article
        v-for="(titulo, i) in portafolio"
        :key="titulo"
        ref="paneles"
        class="relative mb-7.5 overflow-hidden last:mb-0 rounded-[20px] will-change-transform xl:sticky xl:top-7.5"
        data-m-panel
      >
        <Imagen :nombre="`portafolio-${i + 1}`" :alt="titulo.toLowerCase()" class="h-auto w-full" />
        <div class="absolute inset-0 bg-linear-to-b from-transparent to-black/40" />
        <h3 class="font-thunder absolute inset-x-0 bottom-3 text-center text-[13vw] leading-none font-bold text-white md:bottom-12 md:text-[90px] xl:text-[125px] 2xl:text-[180px]">{{ titulo }}</h3>
      </article>
    </div>
  </section>
</template>
