<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Imagen from './imagen.vue'
import VideoDiferido from './videoDiferido.vue'
import { correo, navegacion, redes, telefono, whatsappGeneral } from '@/data/sitio'
import Flecha from './flecha.vue'
import { alVer } from '@/lib/alVer'

const abierto = ref(false)
const yaAbierto = ref(false) // el video del menú no se descarga hasta la primera apertura
const sobreFooter = ref(false) // el footer es azul: el botón cambia de color para distinguirse
let soltarFooter

watch(abierto, (valor) => {
  if (valor) yaAbierto.value = true
  document.documentElement.style.overflow = valor ? 'hidden' : ''
})
const alPulsar = (e) => { if (e.key === 'Escape') abierto.value = false }
onMounted(() => {
  addEventListener('keydown', alPulsar)
  // La franja observada es la zona de la ventana donde está el botón
  soltarFooter = alVer(document.querySelector('footer'), (visible) => { sobreFooter.value = visible }, '-40px 0px -85% 0px')
})
onBeforeUnmount(() => {
  removeEventListener('keydown', alPulsar)
  soltarFooter?.()
})
</script>

<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-20 pt-4 xl:pt-10">
    <div class="mx-auto flex w-full max-w-[1830px] items-start justify-between px-6 lg:px-10">
      <div class="relative w-1/2">
        <h1 class="leading-none">
          <span class="sr-only">Dinozign: Agencia de Inteligencia Artificial y Automatización para tu negocio</span>
          <a
            href="#top"
            class="pointer-events-auto block max-w-60 origin-top-left transition-[opacity,visibility] will-change-transform xl:max-w-none"
            :class="{ 'xl:invisible xl:opacity-0': abierto }"
            data-m-logo
          >
            <Imagen nombre="logo" alt="Dinozign" prioridad sizes="(min-width: 1280px) 48vw, 240px" class="block h-auto w-full" />
          </a>
        </h1>
      </div>
      <button
        type="button"
        class="pointer-events-auto relative flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 lg:size-14"
        :class="abierto || sobreFooter ? 'bg-rosa' : 'bg-azul'"
        :aria-expanded="abierto"
        aria-controls="menu-principal"
        :aria-label="abierto ? 'Cerrar menú' : 'Abrir menú'"
        @click="abierto = !abierto"
      >
        <span class="absolute h-0.5 w-5 rounded-full bg-white transition-[translate,rotate] duration-300 lg:w-6.5" :class="abierto ? 'rotate-45' : '-translate-y-1.5'" />
        <span class="absolute h-0.5 w-5 rounded-full bg-white transition-[translate,rotate] duration-300 lg:w-6.5" :class="abierto ? '-rotate-45' : 'translate-y-1.5'" />
      </button>
    </div>
  </header>

  <div
    class="fixed inset-0 z-16 bg-black/70 transition-opacity duration-500"
    :class="abierto ? 'opacity-100' : 'pointer-events-none opacity-0'"
    aria-hidden="true"
    @click="abierto = false"
  />

  <div
    id="menu-principal"
    class="fixed inset-0 z-17 overflow-y-auto bg-[#0a0a0a] transition-[clip-path,visibility] duration-700 ease-in-out md:inset-5 md:rounded-[20px]"
    :class="abierto ? 'visible' : 'invisible'"
    :style="{ clipPath: `circle(${abierto ? '150%' : '0%'} at calc(100% - 45px) 45px)` }"
  >
    <div class="flex min-h-full flex-col gap-4 px-4 pt-18 pb-4 lg:grid lg:grid-cols-[1fr_minmax(20rem,30%)] lg:gap-10 lg:px-8 lg:pt-22 lg:pb-8 xl:pt-8">
      <nav aria-label="Principal" class="flex flex-1 flex-col">
        <ul class="flex flex-1 flex-col">
          <li v-for="(n, i) in navegacion" :key="n.href" class="flex min-h-13 flex-1 border-t border-white/10 last:border-b">
            <a :href="n.href" class="group relative flex w-full items-center gap-3 overflow-hidden px-2 text-white outline-none transition-colors duration-300 hover:text-tinta focus-visible:text-tinta lg:gap-6 lg:px-5" @click="abierto = false">
              <span class="absolute inset-0 origin-left scale-x-0 bg-verde transition-transform duration-400 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" aria-hidden="true" />
              <span class="relative w-7 shrink-0 text-xs font-medium opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100 lg:w-9 lg:text-sm" aria-hidden="true">0{{ i + 1 }}</span>
              <!-- El texto sube desde abajo de su fila, justo después de que se abre el círculo -->
              <span
                class="relative block transition-transform duration-600 ease-out motion-reduce:transition-none"
                :class="abierto ? 'translate-y-0' : 'translate-y-[120%]'"
                :style="{ transitionDelay: abierto ? `${250 + i * 45}ms` : '0ms' }"
              >
                <span class="font-thunder block pt-[0.1em] text-[max(2.5rem,min(8svh,13vw))] leading-none font-bold tracking-wide uppercase transition-transform duration-400 ease-out group-hover:translate-x-3 group-focus-visible:translate-x-3 lg:text-[max(2.5rem,min(10.5svh,7vw))]">{{ n.texto }}</span>
              </span>
              <span class="relative ml-auto flex opacity-40 transition-[opacity,translate] duration-400 group-hover:-translate-x-2 group-hover:opacity-100 group-focus-visible:opacity-100 [&>svg]:size-5 lg:[&>svg]:size-7" aria-hidden="true"><Flecha /></span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex flex-col gap-4 transition-opacity delay-300 duration-500 lg:justify-between lg:gap-6" :class="abierto ? 'opacity-100' : 'opacity-0'">
        <div class="hidden flex-1 flex-col justify-between gap-6 lg:flex">
          <Imagen nombre="huevo" alt="" sizes="56px" class="hidden h-14 w-auto self-start xl:block" />
          <p class="font-thunder hidden text-[min(7svh,4vw)] leading-[0.95] font-bold tracking-wide text-verde uppercase [@media(min-height:720px)]:block">Ingeniería digital a nivel empresarial</p>
          <div class="flex flex-col gap-6">
          <VideoDiferido v-if="yaAbierto" nombre="menu" class="aspect-video h-auto w-full rounded-2xl object-cover" />
          <address class="space-y-2 text-base text-white/70 not-italic">
            <a class="block break-all transition-colors hover:text-verde" :href="`mailto:${correo}`">{{ correo }}</a>
            <a class="block transition-colors hover:text-verde" :href="whatsappGeneral">{{ telefono }}</a>
          </address>
          </div>
        </div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-2">
            <a v-for="(url, red) in redes" :key="red" :href="url" target="_blank" rel="noopener" class="rounded-full bg-[#1E1E1E] py-3 text-center text-xs font-medium text-white uppercase transition-colors hover:bg-rosa lg:text-sm">{{ red }}</a>
          </div>
          <a :href="whatsappGeneral" class="cta-giro flex justify-center rounded-full bg-rosa px-6 py-4 font-semibold text-white"><span>Iniciar operación <Flecha /></span></a>
        </div>
      </div>
    </div>
  </div>
</template>
