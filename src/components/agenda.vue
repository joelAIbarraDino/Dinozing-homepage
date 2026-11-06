<script setup>
import Flecha from './flecha.vue'
import { calEnlace } from '@/data/sitio'
</script>

<template>
  <section id="agendar" class="pb-(--seccion)">
    <div class="mx-auto w-full max-w-[1750px] px-6 lg:px-10">
      <div class="grid gap-6 border-y border-white/10 py-10 lg:grid-cols-2 lg:items-start lg:gap-8 lg:py-14">
        <h2 class="font-thunder text-[17vw] leading-[0.85] font-bold tracking-wide text-verde uppercase md:text-[110px] xl:text-[150px]">Agenda tu sesión</h2>
        <div class="flex flex-col gap-6 lg:h-full lg:justify-between">
          <p class="text-lg leading-snug font-semibold tracking-tight text-white lg:text-[clamp(1.25rem,1.9vw,2rem)] lg:leading-[1.15]">¿Prefieres ir directo? Elige el día y la hora que mejor te funcionen.</p>
          <a :href="`https://cal.com/${calEnlace}`" target="_blank" rel="noopener" class="cta-giro flex justify-center rounded-full bg-verde px-8 py-4 font-semibold text-tinta lg:self-start"><span>Agenda aquí ahora <Flecha /></span></a>
        </div>
      </div>
    </div>
  </section>
</template>
