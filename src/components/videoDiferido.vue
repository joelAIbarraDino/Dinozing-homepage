<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import media from '@/data/media.json'
import { alVer } from '@/lib/alVer'

defineOptions({ inheritAttrs: false })
const props = defineProps({ nombre: { type: String, required: true } })

const { v, w, h } = media.videos[props.nombre]
const base = `/media/${props.nombre}.${v}`
const video = ref(null)
const cargar = ref(false)
let soltar

onMounted(() => {
  // Con ahorro de datos o movimiento reducido se queda el póster
  if (navigator.connection?.saveData || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  soltar = alVer(video.value, (visible) => {
    if (visible) {
      cargar.value = true
      requestAnimationFrame(() => video.value?.play().catch(() => {}))
    } else {
      video.value?.pause()
    }
  })
})
onBeforeUnmount(() => soltar?.())
</script>

<template>
  <video
    ref="video"
    v-bind="$attrs"
    :poster="`${base}.webp`"
    :width="w"
    :height="h"
    muted
    loop
    playsinline
    preload="none"
    aria-hidden="true"
  >
    <source v-if="cargar" :src="`${base}.mp4`" type="video/mp4">
  </video>
</template>
