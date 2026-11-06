<script setup>
import Imagen from './imagen.vue'
</script>

<template>
  <section aria-label="Nuestro equipo">
    <!-- 15/8 deja la foto 3:2 un 25 % más alta que su marco: ese sobrante es el recorrido del parallax -->
    <div class="aspect-15/8 overflow-hidden">
      <Imagen
        nombre="equipo"
        alt="Integrantes del equipo Dinozign"
        class="h-auto w-full will-change-transform"
        data-m-parallax
      />
    </div>
  </section>
</template>
