<script setup>
import { computed, onMounted, ref } from 'vue'
import Imagen from './imagen.vue'
import Marquesina from './marquesina.vue'
import { marcas } from '@/data/sitio'
import { ordenPonderado } from '@/lib/ordenPonderado'

// El HTML prerenderizado va de mayor a menor peso; el sorteo ocurre ya en el navegador
const orden = ref([...marcas].sort((a, b) => b.peso - a.peso))
onMounted(() => {
  orden.value = ordenPonderado(marcas, (m) => m.peso)
})

// La segunda fila avanza hacia la derecha, así que por la izquierda entra su final. Se acomoda
// [1º, 3º, 5º... 6º, 4º, 2º] para que el menor peso quede en medio, lejos de lo primero que se ve.
function alrededorDelInicio(fila) {
  const frente = fila.filter((_, i) => i % 2 === 0)
  const final = fila.filter((_, i) => i % 2 === 1).reverse()
  return [...frente, ...final]
}

// Se reparten alternadas para que las dos filas arranquen con marcas de mucho peso
const filas = computed(() => {
  const [primera, segunda] = [0, 1].map((f) => orden.value.filter((_, i) => i % 2 === f))
  return [primera, alrededorDelInicio(segunda)]
})
</script>

<template>
  <section id="clients" class="space-y-7" aria-label="Marcas que confían en Dinozign">
    <Marquesina v-for="(fila, f) in filas" :key="f" :duracion="f ? 120 : 105" :inversa="!!f">
      <div v-for="m in fila" :key="m.n" class="mr-5 w-56 shrink-0 lg:w-96">
        <Imagen :nombre="`marca-${m.n}`" :alt="`Logo de ${m.nombre}`" sizes="(min-width: 1024px) 384px, 224px" class="h-auto w-full" />
      </div>
    </Marquesina>
  </section>
</template>
