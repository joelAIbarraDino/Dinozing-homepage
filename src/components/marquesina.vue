<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { alVer } from '@/lib/alVer'

defineProps({
  duracion: { type: Number, default: 60 },
  inversa: { type: Boolean, default: false },
})

const raiz = ref(null)
// El HTML prerenderizado lleva una sola copia; la segunda (decorativa) se crea al acercarse
const duplicada = ref(false)
const corriendo = ref(false)
let soltar

onMounted(() => {
  soltar = alVer(raiz.value, (visible) => {
    if (visible) duplicada.value = true
    corriendo.value = visible
  })
})
onBeforeUnmount(() => soltar?.())
</script>

<template>
  <div ref="raiz" class="overflow-hidden">
    <div
      class="marquesina-pista flex w-max"
      :class="{ corriendo: corriendo && duplicada, inversa }"
      :style="{ '--duracion': `${duracion}s` }"
    >
      <div class="flex shrink-0"><slot /></div>
      <div v-if="duplicada" class="flex shrink-0" aria-hidden="true"><slot /></div>
    </div>
  </div>
</template>
