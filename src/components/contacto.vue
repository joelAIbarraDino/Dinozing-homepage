<script setup>
import { ref } from 'vue'
import Imagen from './imagen.vue'
import Flecha from './flecha.vue'
import Icono from './icono.vue'
import { enlaceWhatsApp } from '@/data/sitio'

const campos = [
  { id: 'name', etiqueta: 'Nombre completo *', tipo: 'text', autocompletar: 'name', requerido: true },
  { id: 'email', etiqueta: 'Correo electrónico *', tipo: 'email', autocompletar: 'email', requerido: true },
  { id: 'whatsapp', etiqueta: 'WhatsApp *', tipo: 'tel', autocompletar: 'tel', requerido: true },
]

const estado = ref('') // '' | 'enviando' | 'ok' | 'error' | 'conexion'
const mensajes = {
  ok: '¡Recibido! Nos pondremos en contacto pronto.',
  error: 'Ocurrió un error al enviar el formulario. Revisa los campos.',
  conexion: 'No se pudo conectar con el servidor. Inténtalo más tarde.',
}

async function enviar(evento) {
  const formulario = evento.target
  estado.value = 'enviando'
  try {
    const respuesta = await fetch('/api/contacto.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(formulario).entries())),
    })
    if (respuesta.ok) formulario.reset()
    estado.value = respuesta.ok ? 'ok' : 'error'
  } catch {
    estado.value = 'conexion'
  }
}

const whatsapp = enlaceWhatsApp('¡Hola Dinozign! Me gustaría agendar una Sesión de Diagnóstico para evaluar cómo implementar IA y Automatización en mi empresa. ¿Qué horarios tienen disponibles?')
const claseEntrada = 'w-full bg-[#f8f8f9] px-6 text-base text-[#0a0a0a] lg:text-sm outline-none border border-transparent focus:border-verde'
</script>

<template>
  <section id="contact-us" class="relative isolate overflow-hidden py-20 lg:py-24">
    <Imagen nombre="contacto-fondo" alt="" class="absolute inset-0 -z-10 size-full object-cover" />
    <div class="mx-auto grid w-full max-w-[1350px] grid-cols-1 gap-8 px-6 lg:grid-cols-[5fr_7fr] lg:gap-28 lg:px-4">
      <div class="rounded-[20px] bg-azul p-6 md:p-8 lg:px-15 lg:py-14">
        <h2 class="mb-6 text-3xl font-medium tracking-tight text-white">Configura tu solicitud</h2>
        <form @submit.prevent="enviar">
          <!-- Trampa para bots: una persona nunca llena este campo -->
          <input name="sitio" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] size-px">
          <div v-for="c in campos" :key="c.id" class="mb-4">
            <label class="mb-1 block text-sm font-medium text-white" :for="c.id">{{ c.etiqueta }}</label>
            <input :id="c.id" :name="c.id" :type="c.tipo" :autocomplete="c.autocompletar" :required="c.requerido" :class="[claseEntrada, 'h-12.5 rounded-full']">
          </div>
          <div class="mb-4">
            <label class="mb-1 block text-sm font-medium text-white" for="description">Describe el reto u objetivo del proyecto *</label>
            <textarea id="description" name="description" required :class="[claseEntrada, 'h-22.5 rounded-xl py-3']" />
          </div>
          <div class="mb-4">
            <label class="mb-1 block text-sm font-medium text-white" for="details">Para aprovechar al máximo nuestra sesión, compártenos información clave o enlaces de referencia (Sitio Web, Redes Sociales, etc.).</label>
            <textarea id="details" name="details" :class="[claseEntrada, 'h-22.5 rounded-xl py-3']" />
          </div>
          <button type="submit" :disabled="estado === 'enviando'" class="w-full cursor-pointer rounded-full bg-verde px-7 py-4 font-semibold text-black transition-opacity disabled:opacity-60">
            {{ estado === 'enviando' ? 'PROCESANDO...' : 'SOLICITAR ANÁLISIS' }}
          </button>
          <p v-if="mensajes[estado]" role="status" class="mt-4 rounded-xl px-4 py-3 text-sm font-semibold" :class="estado === 'ok' ? 'bg-verde text-black' : 'bg-rosa text-white'">{{ mensajes[estado] }}</p>
        </form>
      </div>

      <div>
        <h2 class="mb-5 text-[14vw] leading-tight md:text-[60px] font-medium tracking-tight text-white lg:text-[66px]">INICIA EL DESPLIEGUE</h2>
        <p class="text-xl leading-[1.33] tracking-tight text-white">
          Tienes la visión, nosotros la infraestructura. Describe tu objetivo y diseñaremos la arquitectura exacta para convertir tu idea en un <b class="text-verde">Activo Digital Dominante.</b>
        </p>
        <div class="mt-8 grid gap-5 border-t border-[#d9d9d9] pt-8 md:grid-cols-2">
          <div>
            <h3 class="mb-4 text-2xl font-medium tracking-tight text-verde"><span class="text-verde">RESPUESTA TÁCTICA</span><br> Prioridad alta.</h3>
            <p class="text-sm leading-[1.75] text-white/65">Analizamos tu solicitud y respondemos con viabilidad técnica real, no con discursos de venta vacíos.</p>
          </div>
          <div>
            <h3 class="mb-4 text-2xl font-medium tracking-tight text-verde"><span class="text-verde">CLARIDAD OPERATIVA</span><br> Sin sorpresas.</h3>
            <p class="text-sm leading-[1.75] text-white/65">Definimos alcance, inversión y tiempos de ejecución desde la primera toma de contacto.</p>
          </div>
        </div>
        <div class="mt-8 flex w-full max-w-110.5 items-center gap-3 rounded-[20px] bg-white/25 px-3 py-4 md:gap-5 md:px-5">
          <Imagen nombre="fernanda" alt="Fernanda Romero" sizes="95px" class="h-28 w-auto shrink-0 md:h-36" />
          <div class="min-w-0">
            <p class="leading-tight font-medium text-white">Arquitecto de Soluciones</p>
            <p class="mb-3 text-white/80">Y Proyectos</p>
            <p class="mb-3 text-lg font-medium text-white">Fernanda Romero</p>
            <a :href="whatsapp" class="cta-giro inline-flex rounded-full bg-azul px-3 py-4 text-[15px] md:px-4 leading-none font-semibold whitespace-nowrap text-white"><span><Icono nombre="whatsapp" /> Agendar sesión <Flecha /></span></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
