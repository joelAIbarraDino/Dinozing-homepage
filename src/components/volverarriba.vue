<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { alVer } from '@/lib/alVer'

const mostrar = ref(false)
let soltar
onMounted(() => {
  soltar = alVer(document.getElementById('top'), (visible) => { mostrar.value = !visible }, '0px')
})
onBeforeUnmount(() => soltar?.())
</script>

<template>
  <a
    href="#top"
    aria-label="Volver arriba"
    class="fixed right-5 bottom-5 z-30 flex size-11 items-center justify-center rounded-full bg-white text-black shadow-lg transition-[opacity,translate] hover:-translate-y-1 md:right-12 md:bottom-12"
    :class="mostrar ? 'opacity-100' : 'pointer-events-none opacity-0'"
    :tabindex="mostrar ? 0 : -1"
  >
    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true"><path d="M11 6L6 1L1 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
  </a>
</template>
