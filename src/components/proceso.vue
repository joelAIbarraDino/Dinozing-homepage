<script setup>
import VideoDiferido from './videoDiferido.vue'
import { pasos } from '@/data/sitio'
</script>

<template>
  <section id="dino-process" class="relative xl:flow-root" data-m-proceso>
    <div class="relative flex h-160 flex-col justify-end overflow-hidden bg-[#1C1D20] xl:sticky xl:top-0 xl:h-[min(920px,100vh)]">
      <VideoDiferido nombre="proceso" class="absolute top-[11%] left-[-38%] h-auto w-[900px] max-w-none mix-blend-lighten md:left-[9%] xl:w-[1080px]" />
      <h2 class="font-thunder absolute top-20 left-6 text-[110px] leading-[1.1] font-bold text-white uppercase md:left-10 md:text-[160px] xl:top-30">Así lo<br> hacemos</h2>
      <p class="relative border-y border-white/10 bg-[#1D1D1F] px-6 py-2.5 text-2xl leading-tight font-medium text-white uppercase lg:px-11">
        Creamos soluciones reales con IA para negocios que quieren escalar sin complicarse.
      </p>
    </div>

    <ol class="relative z-10 mt-8 px-3 xl:mt-0 xl:mr-15 xl:mb-[max(20px,calc(50vh-300px))] xl:px-3 xl:after:block xl:after:h-[35vh]">
      <li
        v-for="p in pasos"
        :key="p.num"
        class="mb-8 ml-auto w-full p-8 pb-11 will-change-transform md:px-15 md:pt-15 xl:sticky xl:top-[max(20px,calc(50vh-300px))] xl:mb-0 xl:max-w-132.5 xl:not-first:mt-62.5"
        :style="{ backgroundColor: p.fondo }"
        data-m-paso
      >
        <span class="inline-block rounded-full px-3.5 py-1.5 text-sm leading-none font-semibold uppercase" :class="p.insignia">Paso</span>
        <div class="mb-16 text-right" :class="p.tinta">
          <span class="font-thunder-med block text-[180px] leading-[0.7] md:text-[260px]">{{ p.num }}</span>
          <p class="text-lg leading-6.5"><template v-for="(l, i) in p.texto" :key="i">{{ l }}<br v-if="i < p.texto.length - 1"></template></p>
        </div>
        <h3 class="font-thunder-med text-[50px] leading-[0.9] uppercase md:text-[80px]" :class="p.tinta">{{ p.titulo[0] }} <br> {{ p.titulo[1] }}</h3>
      </li>
    </ol>
  </section>
</template>
