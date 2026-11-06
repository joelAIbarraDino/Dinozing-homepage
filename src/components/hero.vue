<script setup>
import Imagen from './imagen.vue'
import VideoDiferido from './videoDiferido.vue'
import Flecha from './flecha.vue'
import Icono from './icono.vue'
import { redes } from '@/data/sitio'

const socios = [
  { nombre: 'ia-1', alt: 'Logo de OpenAI', numero: '01' },
  { nombre: 'ia-2', alt: 'Logo de AWS', numero: '02' },
  { nombre: 'ia-3', alt: 'Logo de WhatsApp con IA', numero: '03' },
  { nombre: 'ia-4', alt: 'Logo de Gemini', numero: '04' },
]
const anio = new Date().getFullYear()
</script>

<template>
  <section id="top" class="flex w-full items-end pt-30 lg:min-h-[calc(100svh-2.5rem)] lg:pt-0">
    <div class="mx-auto flex w-full max-w-[1870px] flex-col-reverse gap-15 px-6 lg:grid lg:grid-cols-[2fr_7fr_3fr] lg:items-start lg:gap-7.5 lg:px-3">
      <div class="grid grid-cols-4 gap-2 lg:flex lg:flex-col lg:justify-start lg:gap-7.5">
        <div v-for="s in socios" :key="s.numero" class="flex flex-col items-center justify-center lg:flex-row">
          <Imagen :nombre="s.nombre" :alt="s.alt" sizes="120px" class="h-auto w-full max-w-20 md:max-w-30 lg:w-30" />
          <p aria-hidden="true" class="text-sm text-gray-400 lg:-rotate-90">[{{ s.numero }}]</p>
        </div>
      </div>

      <div class="flex min-w-0 flex-col justify-start gap-5">
        <div class="mb-10 flex flex-col gap-5 md:gap-6">
          <p class="text-3xl leading-[1.1] font-medium tracking-[-0.04em] text-white md:text-4xl">Más de 200 negocios en México y EE.UU. han confiado en Dinozign.</p>
          <p class="text-3xl leading-[1.1] font-medium tracking-[-0.04em] text-white md:text-4xl">Creamos agentes de IA, automatizamos procesos y gestionamos campañas que venden 24/7.</p>
        </div>
        <div class="flex flex-col gap-5 lg:flex-row lg:gap-0">
          <p class="text-sm text-gray-400 uppercase md:text-base lg:flex-2">&copy;{{ anio }} Dinozign AIMA</p>
          <ul class="space-y-3 text-sm text-gray-400 uppercase md:text-base lg:flex-2">
            <li>Transformamos negocios con IA</li>
            <li>Automatización personalizada</li>
            <li>Publicidad en Meta y Google</li>
          </ul>
          <ul class="space-y-3 text-sm text-gray-400 uppercase md:text-base lg:flex-1">
            <li v-for="(url, red) in redes" :key="red">
              <a class="cta-giro inline-flex capitalize" :href="url" target="_blank" rel="noopener"><span><Icono :nombre="red" /> {{ red }} <Flecha /></span></a>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex w-full min-w-0 flex-col gap-12.5">
        <Imagen nombre="etiqueta" alt="Etiqueta de Dinozign" sizes="20vw" class="mx-auto hidden h-auto w-4/5 lg:block" />
        <VideoDiferido nombre="hero" class="h-auto w-full" />
      </div>
    </div>
  </section>
</template>
