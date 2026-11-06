<script setup>
import { onMounted } from 'vue'
import Siteheader from './components/siteheader.vue'
import Hero from './components/hero.vue'
import Kiosko from './components/kiosko.vue'
import Equipo from './components/equipo.vue'
import Nosotros from './components/nosotros.vue'
import Servicios from './components/servicios.vue'
import Portafolio from './components/portafolio.vue'
import Capsulas from './components/capsulas.vue'
import Marcas from './components/marcas.vue'
import Proceso from './components/proceso.vue'
import Evidencia from './components/evidencia.vue'
import Contacto from './components/contacto.vue'
import Sitefooter from './components/sitefooter.vue'
import Volverarriba from './components/volverarriba.vue'

// GSAP solo se descarga en pantallas grandes y sin preferencia de movimiento reducido
onMounted(() => {
  const consulta = matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
  const cargar = () => {
    const iniciar = () => import('./lib/motion.js').then((m) => m.iniciar())
    window.requestIdleCallback ? requestIdleCallback(iniciar, { timeout: 2000 }) : setTimeout(iniciar, 300)
  }
  if (consulta.matches) cargar()
  else consulta.addEventListener('change', cargar, { once: true })
})
</script>

<template>
  <Siteheader />
  <main class="flex flex-col gap-(--seccion)">
    <Hero />
    <Kiosko />
    <Equipo />
    <Nosotros />
    <Servicios />
    <Portafolio />
    <Capsulas />
    <Marcas />
    <Proceso />
    <Evidencia />
    <Contacto />
  </main>
  <Sitefooter />
  <Volverarriba />
  <div class="desenfoque-inferior" aria-hidden="true" />
</template>
