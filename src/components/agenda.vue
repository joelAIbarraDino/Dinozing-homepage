<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Flecha from './flecha.vue'
import { alVer } from '@/lib/alVer'
import { iniciarCal } from '@/lib/cal'
import { calEnlace } from '@/data/sitio'

const calendario = ref(null)
let soltar

// El calendario pesa y es de un tercero: se pide solo al acercarse a la sección
onMounted(() => {
  soltar = alVer(calendario.value, (visible) => {
    if (!visible) return
    soltar()
    iniciarCal(calendario.value, calEnlace)
  }, '800px')
})
onBeforeUnmount(() => soltar?.())
</script>

<template>
  <section id="agendar" class="pb-(--seccion)">
    <div class="mx-auto w-full max-w-[1750px] px-6 lg:px-10">
      <div class="mb-8 grid gap-5 lg:mb-10 lg:grid-cols-2 lg:items-start lg:gap-8">
        <h2 class="font-thunder text-[17vw] leading-[0.85] font-bold tracking-wide text-verde uppercase md:text-[110px] xl:text-[150px]">Agenda tu sesión</h2>
        <div class="space-y-4 lg:pb-2">
          <p class="text-lg leading-snug font-semibold tracking-tight text-white lg:text-[clamp(1.25rem,1.9vw,2rem)] lg:leading-[1.15]">¿Prefieres ir directo? Elige el día y la hora que mejor te funcionen.</p>
          <!-- Enlace siempre disponible: funciona aunque el calendario no cargue -->
          <a :href="`https://cal.com/${calEnlace}`" target="_blank" rel="noopener" class="cta-giro inline-flex text-sm font-medium text-white/70 underline underline-offset-4 transition-colors hover:text-verde"><span>Abrir en Cal.com <Flecha /></span></a>
        </div>
      </div>
      <!-- El alto mínimo reserva el espacio mientras llega el calendario -->
      <div ref="calendario" class="min-h-285 w-full border-y border-white/10 lg:min-h-155" />
    </div>
  </section>
</template>
