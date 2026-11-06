import Matter from 'matter-js'

const { Bodies, Body, Composite, Engine, Mouse, MouseConstraint } = Matter

// Reproduce las cápsulas que caen de la plantilla, sin jQuery ni GSAP.
// El bucle se detiene fuera de pantalla y cuando todas las cápsulas ya están en reposo.
export function iniciarFisica(escena) {
  const elementos = [...escena.querySelectorAll('[data-capsula]')]
  let ancho = escena.offsetWidth
  let alto = escena.offsetHeight
  const engine = Engine.create({ enableSleeping: true })
  engine.gravity.y = 0.8

  const pared = (x, y, w, h) => Bodies.rectangle(x, y, w, h, { isStatic: true })
  let paredes = []
  const crearParedes = () => {
    Composite.remove(engine.world, paredes)
    paredes = [
      pared(-250, alto / 2, 500, alto * 4),
      pared(ancho + 250, alto / 2, 500, alto * 4),
      pared(ancho / 2, alto + 250, ancho * 2, 500),
    ]
    Composite.add(engine.world, paredes)
  }
  crearParedes()

  const cuerpos = elementos.map((el, i) => {
    const r = el.offsetWidth / 2
    const cuerpo = Bodies.circle(r + Math.random() * Math.max(ancho - r * 2, 1), -r - i * (r * 2 + 10), r, {
      restitution: 0.3,
      angle: (Math.random() - 0.5) * 1.2,
      sleepThreshold: 45,
    })
    return cuerpo
  })
  Composite.add(engine.world, cuerpos)

  // En táctil no se arrastra: Matter bloquearía el scroll de la página
  let mouse
  if (matchMedia('(pointer: fine)').matches) {
    mouse = Mouse.create(escena)
    mouse.element.removeEventListener('wheel', mouse.mousewheel)
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)
    Composite.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } }))
    escena.addEventListener('mouseleave', mouse.mouseup)
  }

  const pintar = () => cuerpos.forEach((c, i) => {
    const r = elementos[i].offsetWidth / 2
    elementos[i].style.transform = `translate(${(c.position.x - r).toFixed(1)}px, ${(c.position.y - r).toFixed(1)}px) rotate(${c.angle.toFixed(2)}rad)`
  })
  // Se revelan ya colocadas arriba de la escena: nunca se ve su posición inicial
  pintar()
  elementos.forEach((el) => { el.style.opacity = '1' })

  let visible = false
  let cuadro = 0
  let ultimo = 0

  function paso(ahora) {
    cuadro = 0
    if (!visible) return
    Engine.update(engine, Math.min(ahora - (ultimo || ahora - 16), 1000 / 60) || 1000 / 60)
    ultimo = ahora
    pintar()
    // mouse.button es 0 mientras se arrastra una cápsula
    if (cuerpos.every((c) => c.isSleeping) && mouse?.button !== 0) {
      ultimo = 0
      return
    }
    cuadro = requestAnimationFrame(paso)
  }
  const arrancar = () => {
    if (visible && !cuadro) cuadro = requestAnimationFrame(paso)
  }

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    arrancar()
  })
  io.observe(escena)
  escena.addEventListener('mousedown', arrancar)
  escena.addEventListener('mousemove', arrancar)

  const alCambiarTamano = () => {
    if (escena.offsetWidth === ancho && escena.offsetHeight === alto) return
    ancho = escena.offsetWidth
    alto = escena.offsetHeight
    crearParedes()
    cuerpos.forEach((c) => {
      Matter.Sleeping.set(c, false)
      if (c.position.x > ancho) Body.setPosition(c, { x: ancho / 2, y: c.position.y })
    })
    arrancar()
  }
  addEventListener('resize', alCambiarTamano, { passive: true })

  return () => {
    io.disconnect()
    cancelAnimationFrame(cuadro)
    removeEventListener('resize', alCambiarTamano)
    Engine.clear(engine)
  }
}
