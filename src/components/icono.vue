<script setup>
// Logos de marca definidos en iconosprite.vue; toman el color del texto que los rodea
defineProps({ nombre: { type: String, required: true } })
</script>

<template>
  <svg class="size-4 shrink-0" aria-hidden="true"><use :href="`#i-${nombre.toLowerCase()}`" /></svg>
</template>
