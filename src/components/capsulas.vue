<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { alVer } from '@/lib/alVer'
import { capsulas } from '@/data/sitio'

const escena = ref(null)
const lista = ref(false)
let soltarCarga
let destruir

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lista.value = true
    return
  }
  // matter-js se descarga con margen para que la física esté lista antes de llegar a la sección
  soltarCarga = alVer(escena.value, async (visible) => {
    if (!visible) return
    soltarCarga()
    try {
      const { iniciarFisica } = await import('@/lib/fisica.js')
      if (escena.value) destruir = iniciarFisica(escena.value)
    } catch {
      lista.value = true
    }
  }, '1000px')
})
onBeforeUnmount(() => {
  soltarCarga?.()
  destruir?.()
})
</script>

<template>
  <section class="mx-auto w-full max-w-[1550px] px-3">
    <div class="border border-white/10">
      <h2 class="font-thunder px-3 pt-15 lg:px-10 text-[60px] leading-[0.8] font-bold text-white uppercase md:text-[80px] xl:text-[100px]">Te ayudamos <br> con...</h2>
      <ul
        ref="escena"
        class="capsulas-escena pointer-events-none relative h-120 overflow-hidden lg:h-162.5"
        :class="{ lista }"
      >
        <li
          v-for="c in capsulas"
          :key="c.texto"
          data-capsula
          class="pointer-events-auto absolute top-0 left-0 opacity-0 select-none"
        >
          <span
            class="font-thunder-med flex items-center justify-center rounded-full p-2 text-center text-[15px] leading-none text-white max-lg:size-24! lg:text-[32px] lg:leading-none"
            :class="c.grande ? 'size-55' : 'size-42.5'"
            :style="{ backgroundColor: c.color }"
          >{{ c.texto }}</span>
        </li>
      </ul>
    </div>
    <div class="mt-2.5 space-y-2" aria-hidden="true">
      <div class="h-2.5 bg-white" /><div class="h-2 bg-white" /><div class="h-1.5 bg-white" /><div class="h-1 bg-white" /><div class="h-0.5 bg-white" />
    </div>
  </section>
</template>
