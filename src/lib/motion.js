// Animaciones ligadas al scroll. Este módulo (y GSAP) solo se descarga desde 1024 px,
// y se usa un único ScrollTrigger por animación en vez de uno por letra como la plantilla.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const todos = (selector) => gsap.utils.toArray(selector)

function logo() {
  const el = document.querySelector('[data-m-logo]')
  if (!el) return
  gsap.fromTo(el, { scale: 1 }, {
    scale: () => Math.min(1, 250 / el.offsetWidth),
    ease: 'power2.out',
    scrollTrigger: { start: 0, end: 320, scrub: 1, invalidateOnRefresh: true },
  })
}

function parallax() {
  todos('[data-m-parallax]').forEach((el) => {
    gsap.fromTo(el, { yPercent: -20 }, {
      yPercent: 0,
      ease: 'none',
      // El padre directo es un <picture> sin caja propia: la referencia es el marco
      scrollTrigger: { trigger: el.closest('.overflow-hidden'), start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })
}

// Mismos valores que la plantilla: cada letra se enfoca a la vez, con su propia curva
function texto() {
  todos('[data-m-texto]').forEach((el) => {
    const { chars } = new SplitText(el, { type: 'words,chars', aria: 'none' })
    const mitad = Math.ceil(chars.length / 2)
    const posicion = (i) => (i < mitad ? i : mitad - Math.abs(Math.floor(chars.length / 2) - i) - 1)
    gsap.fromTo(chars, {
      y: (i) => gsap.utils.mapRange(0, mitad, 0, 60, posicion(i)),
      rotation: (i) => (i < mitad
        ? gsap.utils.mapRange(0, mitad, -4, 0, posicion(i))
        : gsap.utils.mapRange(0, mitad, 0, 4, posicion(i))),
      scale: 0.5,
      opacity: 0,
      filter: 'blur(12px)',
      transformOrigin: '50% 100%',
    }, {
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      ease: 'power2.inOut',
      scrollTrigger: { trigger: el, start: 'top bottom+=40%', end: 'top top+=15%', scrub: true },
    })
  })
}

function portafolio() {
  const fin = document.querySelector('[data-m-portafolio]')
  todos('[data-m-panel]').forEach((panel) => {
    gsap.to(panel, {
      scale: 0.8,
      ease: 'none',
      scrollTrigger: { trigger: panel, start: 'top 30px', endTrigger: fin, end: 'bottom bottom', scrub: 1 },
    })
  })
}

function pasos() {
  const fin = document.querySelector('[data-m-proceso]')
  todos('[data-m-paso]').forEach((tarjeta, i) => {
    gsap.to(tarjeta, {
      rotate: i % 2 === 0 ? -5 : 5,
      ease: 'none',
      scrollTrigger: { trigger: tarjeta, start: 'top 20%', endTrigger: fin, end: 'bottom bottom', scrub: 1 },
    })
  })
}

function aparicion() {
  todos('[data-m-fade]').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.75,
      delay: 0.3 + i * 0.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    })
  })
}

export function iniciar() {
  logo()
  parallax()
  texto()
  aparicion()
  // Estos paneles solo son sticky desde 1280 px
  gsap.matchMedia().add('(min-width: 1280px)', () => {
    portafolio()
    pasos()
  })
  // Recalcula cuando cambian las métricas por las fuentes definitivas
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
}
