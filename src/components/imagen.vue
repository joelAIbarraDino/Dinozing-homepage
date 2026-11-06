<script setup>
import { computed } from 'vue'
import media from '@/data/media.json'

defineOptions({ inheritAttrs: false })
const props = defineProps({
  nombre: { type: String, required: true },
  alt: { type: String, required: true },
  sizes: { type: String, default: '100vw' },
  prioridad: { type: Boolean, default: false },
})

const datos = computed(() => media.imagenes[props.nombre])
const srcset = (formato) =>
  datos.value.s.map((w) => `/media/${props.nombre}.${datos.value.v}-${w}.${formato} ${w}w`).join(', ')
const respaldo = computed(() => {
  const { s, v } = datos.value
  return `/media/${props.nombre}.${v}-${s[Math.floor((s.length - 1) / 2)]}.webp`
})
</script>

<template>
  <picture class="contents">
    <source type="image/avif" :srcset="srcset('avif')" :sizes="sizes">
    <source type="image/webp" :srcset="srcset('webp')" :sizes="sizes">
    <img
      v-bind="$attrs"
      :src="respaldo"
      :alt="alt"
      :width="datos.w"
      :height="datos.h"
      :loading="prioridad ? 'eager' : 'lazy'"
      :fetchpriority="prioridad ? 'high' : undefined"
      decoding="async"
    >
  </picture>
</template>
