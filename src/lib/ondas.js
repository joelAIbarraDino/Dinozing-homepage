// Efecto de agua de los paneles, adaptado de jquery.ripples (MIT, Pim Schreurs) con los
// valores de la plantilla. Sin jQuery, con WebGL2, y solo simula mientras hay ondas.
const RESOLUCION = 400
const PERTURBACION = 0.03
const PASOS_POR_SEGUNDO = 60
const REPOSO_MS = 4000

const VERTICE = `#version 300 es
in vec2 vertice;
out vec2 coord;
void main() {
  coord = vertice * 0.5 + 0.5;
  gl_Position = vec4(vertice, 0.0, 1.0);
}`

const fragmento = (cuerpo) => `#version 300 es
precision highp float;
uniform sampler2D ondas;
uniform sampler2D fondo;
uniform vec2 delta;
uniform vec2 centro;
uniform float radio;
uniform float fuerza;
uniform vec2 proporcion;
in vec2 coord;
out vec4 color;
const float PI = 3.141592653589793;
void main() { ${cuerpo} }`

const GOTA = fragmento(`
  vec4 info = texture(ondas, coord);
  float gota = max(0.0, 1.0 - length(centro * 0.5 + 0.5 - coord) / radio);
  info.r += (0.5 - cos(gota * PI) * 0.5) * fuerza;
  color = info;`)

const ALTURA = fragmento(`
  vec4 info = texture(ondas, coord);
  vec2 dx = vec2(delta.x, 0.0);
  vec2 dy = vec2(0.0, delta.y);
  float media = (texture(ondas, coord - dx).r + texture(ondas, coord - dy).r
    + texture(ondas, coord + dx).r + texture(ondas, coord + dy).r) * 0.25;
  info.g += (media - info.r) * 2.0;
  info.g *= 0.98;
  info.r += info.g;
  color = info;`)

const NORMALES = fragmento(`
  vec4 info = texture(ondas, coord);
  vec3 dx = vec3(delta.x, texture(ondas, vec2(coord.x + delta.x, coord.y)).r - info.r, 0.0);
  vec3 dy = vec3(0.0, texture(ondas, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);
  info.ba = normalize(cross(dy, dx)).xz;
  color = info;`)

const DIBUJO = fragmento(`
  vec2 plano = coord * 2.0 - 1.0;
  vec2 desvio = -texture(ondas, plano * proporcion * 0.5 + 0.5).ba;
  float brillo = pow(max(0.0, dot(desvio, normalize(vec2(-0.6, 1.0)))), 4.0);
  color = texture(fondo, coord + desvio * ${PERTURBACION}) + brillo;`)

function crearPrograma(gl, fuente) {
  const compilar = (tipo, codigo) => {
    const shader = gl.createShader(tipo)
    gl.shaderSource(shader, codigo)
    gl.compileShader(shader)
    return shader
  }
  const id = gl.createProgram()
  gl.attachShader(id, compilar(gl.VERTEX_SHADER, VERTICE))
  gl.attachShader(id, compilar(gl.FRAGMENT_SHADER, fuente))
  gl.bindAttribLocation(id, 0, 'vertice')
  gl.linkProgram(id)
  if (!gl.getProgramParameter(id, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(id))
  const u = (nombre) => gl.getUniformLocation(id, nombre)
  return { id, u }
}

function crearCapa(gl) {
  const textura = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, textura)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, RESOLUCION, RESOLUCION, 0, gl.RGBA, gl.HALF_FLOAT, null)
  const buffer = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, buffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textura, 0)
  return { textura, buffer }
}

export function crearOndas(panel, eventoInicial) {
  const imagen = panel.querySelector('img')
  if (!imagen?.complete || !imagen.naturalWidth) return

  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;visibility:hidden'
  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false })
  // Sin soporte el panel simplemente conserva su imagen
  if (!gl || !(gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'))) return
  imagen.parentElement.after(canvas)

  const programas = {
    gota: crearPrograma(gl, GOTA),
    altura: crearPrograma(gl, ALTURA),
    normales: crearPrograma(gl, NORMALES),
    dibujo: crearPrograma(gl, DIBUJO),
  }
  const delta = 1 / RESOLUCION
  for (const p of [programas.altura, programas.normales]) {
    gl.useProgram(p.id)
    gl.uniform2f(p.u('delta'), delta, delta)
  }
  gl.useProgram(programas.dibujo.id)
  gl.uniform1i(programas.dibujo.u('ondas'), 0)
  gl.uniform1i(programas.dibujo.u('fondo'), 1)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  let capas = [crearCapa(gl), crearCapa(gl)]
  const limpiar = () => {
    gl.clearColor(0, 0, 0, 0)
    for (const c of capas) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, c.buffer)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
  }
  limpiar()

  const fondo = gl.createTexture()
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, fondo)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imagen)
  gl.activeTexture(gl.TEXTURE0)

  // Dibuja sobre la capa libre leyendo la actual, y las intercambia
  const pasada = (programa, uniformes) => {
    gl.viewport(0, 0, RESOLUCION, RESOLUCION)
    gl.useProgram(programa.id)
    uniformes?.(programa)
    gl.bindFramebuffer(gl.FRAMEBUFFER, capas[1].buffer)
    gl.bindTexture(gl.TEXTURE_2D, capas[0].textura)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
    capas = [capas[1], capas[0]]
  }

  const dibujar = () => {
    const escala = Math.min(devicePixelRatio, 1.5)
    const ancho = Math.min(Math.round(panel.offsetWidth * escala), imagen.naturalWidth)
    const alto = Math.round(ancho * panel.offsetHeight / panel.offsetWidth)
    if (canvas.width !== ancho || canvas.height !== alto) {
      canvas.width = ancho
      canvas.height = alto
    }
    const mayor = Math.max(panel.offsetWidth, panel.offsetHeight)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, ancho, alto)
    gl.useProgram(programas.dibujo.id)
    gl.uniform2f(programas.dibujo.u('proporcion'), panel.offsetWidth / mayor, panel.offsetHeight / mayor)
    gl.bindTexture(gl.TEXTURE_2D, capas[0].textura)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
  }

  let cuadro = 0
  let previo = 0
  let acumulado = 0
  let ultimaGota = 0

  function animar(ahora) {
    if (ahora - ultimaGota > REPOSO_MS) {
      cuadro = 0
      canvas.style.visibility = 'hidden'
      limpiar()
      return
    }
    acumulado = Math.min(acumulado + ahora - (previo || ahora), 2000 / PASOS_POR_SEGUNDO)
    previo = ahora
    // A 120 Hz las ondas avanzan a la misma velocidad que a 60 Hz
    while (acumulado >= 1000 / PASOS_POR_SEGUNDO) {
      pasada(programas.altura)
      pasada(programas.normales)
      acumulado -= 1000 / PASOS_POR_SEGUNDO
    }
    dibujar()
    cuadro = requestAnimationFrame(animar)
  }

  // getBoundingClientRect incluye la escala que GSAP aplica al panel
  const soltarGota = (evento, radio, fuerza) => {
    const r = panel.getBoundingClientRect()
    const x = (evento.clientX - r.left) / r.width
    const y = (evento.clientY - r.top) / r.height
    const mayor = Math.max(r.width, r.height)
    pasada(programas.gota, (p) => {
      gl.uniform2f(p.u('centro'), ((2 * x - 1) * r.width) / mayor, ((1 - 2 * y) * r.height) / mayor)
      gl.uniform1f(p.u('radio'), radio)
      gl.uniform1f(p.u('fuerza'), fuerza)
    })
    ultimaGota = performance.now()
    if (!cuadro) {
      previo = 0
      canvas.style.visibility = 'visible'
      cuadro = requestAnimationFrame(animar)
    }
  }

  panel.addEventListener('pointermove', (e) => soltarGota(e, 0.03, 0.01))
  panel.addEventListener('pointerdown', (e) => soltarGota(e, 0.09, 0.14))
  canvas.addEventListener('webglcontextlost', () => { canvas.style.display = 'none' })
  soltarGota(eventoInicial, 0.03, 0.01)
}
