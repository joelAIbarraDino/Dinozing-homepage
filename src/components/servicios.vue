<script setup>
import { ref } from 'vue'
import Imagen from './imagen.vue'
import Flecha from './flecha.vue'
import { enlaceWhatsApp, servicios } from '@/data/sitio'

const activo = ref(0)
</script>

<template>
  <section id="solutions">
    <div class="mx-auto w-full max-w-[1750px] px-6 lg:px-10">
      <div class="mb-12 flex items-start justify-between gap-6 text-white uppercase">
        <p class="shrink-0 text-sm md:text-base">[ Servicios ]</p>
        <p class="text-right text-sm font-medium tracking-tight md:text-base">Lo que hacemos en Dinozign: IA, estrategia y resultados.</p>
      </div>

      <div class="relative lg:min-h-200 lg:pl-[50%]">
        <article v-for="(s, i) in servicios" :key="s.titulo">
          <h3 class="border-b border-white/10 pt-7 pb-2.5">
            <button
              type="button"
              class="font-thunder relative w-full cursor-pointer text-left text-[40px] leading-none lg:text-[50px] font-bold transition-[padding,color] duration-300 lg:pr-14"
              :class="activo === i ? 'text-rosa lg:pl-12' : 'text-white'"
              :aria-expanded="activo === i"
              @mouseenter="activo = i"
              @focus="activo = i"
              @click="activo = i"
            >
              {{ s.titulo }}
              <span class="absolute top-[20%] right-0 hidden font-sans text-base font-medium text-white lg:inline" aria-hidden="true">{ 0{{ i + 1 }} }</span>
            </button>
          </h3>
          <div
            class="pt-6 pb-8 lg:absolute lg:pb-0 lg:top-5 lg:left-0 lg:w-[42%] lg:max-w-125 lg:pt-0 lg:transition-[opacity,translate,visibility] lg:duration-400"
            :class="activo === i ? 'lg:visible lg:translate-y-0 lg:opacity-100' : 'max-lg:hidden lg:invisible lg:translate-y-20 lg:opacity-0'"
          >
            <Imagen :nombre="s.imagen" :alt="s.alt" sizes="(min-width: 992px) 500px, 100vw" class="mb-6 h-auto w-full" />
            <p class="mb-2.5 hidden text-[17px] tracking-tight text-white/60 lg:block">{{ s.titulo }}</p>
            <p class="text-lg leading-snug font-semibold tracking-tight text-white lg:text-[22px] lg:leading-[1.18]">{{ s.texto }}</p>
            <ul class="mt-4 space-y-1 text-sm leading-6.5 font-bold text-white">
              <li v-for="p in s.puntos" :key="p" class="flex gap-2"><span class="text-rosa" aria-hidden="true">✓</span><span>{{ p }}</span></li>
            </ul>
            <a :href="enlaceWhatsApp(s.mensaje)" class="cta-giro mt-7 inline-flex rounded-full bg-azul px-4 py-5 text-[15px] leading-none font-semibold text-white">
              <span>{{ s.cta }} <Flecha /></span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
