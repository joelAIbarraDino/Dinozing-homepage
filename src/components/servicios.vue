<script setup>
import { nextTick, onMounted, ref } from 'vue'
import Imagen from './imagen.vue'
import Flecha from './flecha.vue'
import Icono from './icono.vue'
import { enlaceWhatsApp, servicios } from '@/data/sitio'

const activo = ref(0)
// En el acordeón una imagen se descarga al abrir su opción. En escritorio se piden todas
// desde el inicio para que el cambio con el cursor sea inmediato.
const conImagen = ref(new Set([0]))
const enEscritorio = () => matchMedia('(min-width: 1024px)').matches
onMounted(() => {
  if (enEscritorio()) servicios.forEach((_, i) => conImagen.value.add(i))
})
function activar(i) {
  conImagen.value.add(i)
  activo.value = i
}

// Solo el mouse activa con hover: en táctil el toque también dispara pointerenter y foco,
// y eso abriría la opción justo antes de que el clic la cerrara.
function alEntrar(evento, i) {
  if (evento.pointerType === 'mouse') activar(i)
}
function alEnfocar(i) {
  if (enEscritorio()) activar(i)
}

async function alPulsar(evento, i) {
  if (enEscritorio()) {
    activar(i)
    return
  }
  const boton = evento.currentTarget
  if (activo.value === i) activo.value = -1
  else activar(i)
  // Al cerrarse una opción de arriba, la fila tocada sube: se regresa a la vista cuando termina
  await nextTick()
  setTimeout(() => {
    const arriba = boton.getBoundingClientRect().top
    if (arriba < 90) scrollBy({ top: arriba - 90 })
  }, 420)
}
</script>

<template>
  <section id="solutions">
    <div class="mx-auto w-full max-w-[1750px] px-6 lg:px-10">
      <div class="mb-8 flex items-start justify-between gap-6 text-white uppercase">
        <p class="shrink-0 text-sm md:text-base">[ Servicios ]</p>
        <p class="text-right text-sm font-medium tracking-tight md:text-base">Lo que hacemos en Dinozign: IA, estrategia y resultados.</p>
      </div>

      <!-- En escritorio cada fila ocupa su renglón y todos los paneles comparten la misma celda: la altura sale del contenido -->
      <div class="border-t border-white/10 lg:grid lg:grid-cols-2 lg:grid-rows-[repeat(5,1fr)] lg:gap-x-8 lg:border-t-0">
        <article v-for="(s, i) in servicios" :key="s.titulo" class="lg:contents">
          <h3 class="border-b border-white/10 lg:col-start-1 lg:flex" :class="{ 'lg:border-t': i === 0 }" :style="{ gridRow: i + 1 }">
            <button
              type="button"
              class="group relative flex min-h-18 w-full cursor-pointer items-center gap-3 overflow-hidden px-3 py-3 text-left transition-colors duration-300 lg:px-5"
              :class="activo === i ? 'text-tinta' : 'text-white'"
              :aria-expanded="activo === i"
              @pointerenter="alEntrar($event, i)"
              @focus="alEnfocar(i)"
              @click="alPulsar($event, i)"
            >
              <span class="absolute inset-0 origin-left bg-verde transition-transform duration-400 ease-out" :class="activo === i ? 'scale-x-100' : 'scale-x-0'" aria-hidden="true" />
              <span class="relative w-7 shrink-0 text-xs font-medium lg:w-9 lg:text-sm" :class="activo === i ? '' : 'opacity-50'" aria-hidden="true">0{{ i + 1 }}</span>
              <span class="font-thunder relative min-w-0 flex-1 pt-[0.08em] text-[34px] leading-none font-bold tracking-wide md:text-[42px] lg:text-[clamp(1.75rem,2.9vw,3.5rem)]">{{ s.titulo }}</span>
              <!-- El "+" solo existe en el acordeón del teléfono -->
              <span class="relative size-5 shrink-0 lg:hidden" aria-hidden="true">
                <span class="absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 bg-current" />
                <span class="absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 bg-current transition-transform duration-300" :class="activo === i ? '' : 'rotate-90'" />
              </span>
            </button>
          </h3>

          <div
            class="grid transition-[grid-template-rows,opacity,translate,visibility] duration-400 ease-out lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:block"
            :class="activo === i ? 'visible grid-rows-[1fr] lg:translate-y-0 lg:opacity-100' : 'invisible grid-rows-[0fr] lg:translate-y-4 lg:opacity-0'"
          >
            <div class="min-h-0 overflow-hidden lg:h-full lg:overflow-visible">
              <div class="flex flex-col gap-5 pt-4 pb-8 lg:grid lg:h-full lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-6 lg:border-y lg:border-white/10 lg:py-6">
                <Imagen v-if="conImagen.has(i)" :nombre="s.imagen" :alt="s.alt" sizes="(min-width: 1024px) 24vw, 100vw" class="aspect-4/3 h-auto w-full object-cover lg:col-start-1 lg:row-start-2 lg:self-start" />
                <p class="text-lg leading-snug font-semibold tracking-tight text-white lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:text-[clamp(1.25rem,1.9vw,2rem)] lg:leading-[1.15]">{{ s.texto }}</p>
                <div class="flex flex-col justify-between gap-5 lg:col-start-2 lg:row-start-2">
                  <ul class="space-y-2 text-sm leading-snug font-bold text-white lg:space-y-0 lg:divide-y lg:divide-white/10">
                    <li v-for="p in s.puntos" :key="p" class="flex gap-2 lg:py-2.5 lg:first:pt-0"><span class="text-rosa" aria-hidden="true">✓</span><span>{{ p }}</span></li>
                  </ul>
                  <a :href="enlaceWhatsApp(s.mensaje)" class="cta-giro flex justify-center self-stretch rounded-full bg-azul px-5 py-4 text-[15px] leading-tight font-semibold text-white lg:inline-flex lg:self-start lg:text-left">
                    <span><Icono nombre="whatsapp" /> {{ s.cta }} <Flecha class="shrink-0" /></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
