<script setup>
import { correo, navegacion, redes, telefono, whatsappGeneral } from '@/data/sitio'
import Flecha from './flecha.vue'
import Icono from './icono.vue'
import insigniaHostinger from '@/assets/hostinger-partner.svg'
const enlaces = navegacion.filter((n) => !['#top', '#contact-us', '#agendar'].includes(n.href))
</script>

<template>
  <footer class="bg-azul text-white">
    <div class="mx-auto grid w-full max-w-[1550px] gap-10 px-6 pt-20 pb-9 lg:grid-cols-[4fr_5fr_3fr] lg:pt-31">
      <div data-m-fade>
        <p class="mb-7.5 text-[50px] leading-none font-bold tracking-[-0.06em] text-verde xl:text-[66px]">INGENIERÍA DIGITAL A NIVEL EMPRESARIAL</p>
        <div class="grid grid-cols-3 gap-2 lg:flex lg:flex-wrap">
          <a v-for="(url, red) in redes" :key="red" :href="url" target="_blank" rel="noopener" class="cta-giro inline-flex justify-center rounded-full bg-white/10 py-3 text-sm font-medium uppercase transition-colors hover:bg-rosa lg:px-5"><span class="gap-1.5! lg:gap-2.5!"><Icono :nombre="red" /> <span class="max-lg:text-xs">{{ red }}</span> <Flecha class="max-lg:hidden" /></span></a>
        </div>
      </div>
      <nav aria-label="Pie de página" data-m-fade>
        <ul class="flex flex-wrap gap-2">
          <li v-for="n in enlaces" :key="n.href">
            <a :href="n.href" class="inline-block rounded-full bg-white/10 px-5 py-3.5 text-sm leading-none font-medium tracking-tight uppercase transition-colors hover:bg-rosa">{{ n.texto }}</a>
          </li>
          <li><a :href="whatsappGeneral" class="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3.5 text-sm leading-none font-medium tracking-tight uppercase transition-colors hover:bg-rosa"><Icono nombre="whatsapp" /> Agendar sesión</a></li>
        </ul>
      </nav>
      <address class="space-y-4 not-italic" data-m-fade>
        <a class="block hover:text-rosa" :href="`mailto:${correo}`">{{ correo }}</a>
        <a class="flex items-center gap-2 hover:text-rosa" :href="whatsappGeneral"><Icono nombre="whatsapp" /> {{ telefono }}</a>
        <a class="block hover:text-rosa" href="https://maps.app.goo.gl/VJbfqHUoyGyXi87C6" target="_blank" rel="noopener">Av. P.º de la Reforma 390,<br> CDMX</a>
        <img :src="insigniaHostinger" alt="Hostinger Partner" width="160" height="60" loading="lazy" decoding="async" class="mt-8">
      </address>
    </div>
    <p class="overflow-hidden pb-2 text-center text-[17vw] leading-none font-bold tracking-[-0.06em] 2xl:text-[290px]" aria-hidden="true">DINOZIGN</p>
  </footer>
</template>
