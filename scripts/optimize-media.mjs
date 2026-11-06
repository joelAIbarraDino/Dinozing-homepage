// Genera los medios optimizados en public/media a partir de media-src/.
// Uso: npm run media  (omite lo que ya existe; el nombre lleva un hash del original + ajustes).
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import sharp from 'sharp'

const SRC = 'media-src/template'
const SRC_V2 = 'media-src/video-v2'
const OUT = 'public/media'
mkdirSync(OUT, { recursive: true })

const rango = (n) => Array.from({ length: n }, (_, i) => i + 1)

const imagenes = [
  { nombre: 'logo', src: 'logo/logo-orange.png', anchos: [320, 640, 960, 1400], q: 80 },
  { nombre: 'huevo', src: 'logo/dinohuevo.png', anchos: [260], q: 80 },
  { nombre: 'etiqueta', src: 'shape/shape-1.png', anchos: [540, 1080], q: 75 },
  ...rango(4).map((i) => ({ nombre: `ia-${i}`, src: `hero/hero-${i}.png`, anchos: [160, 320], q: 75 })),
  { nombre: 'equipo', src: 'banner/dinoqeuipo.jpg', anchos: [640, 1280, 1920, 2560], q: 62 },
  ...rango(5).map((i) => ({ nombre: `servicio-${i}`, src: `project/project-${i}.jpg`, anchos: [500, 900], q: 60 })),
  ...rango(5).map((i) => ({ nombre: `portafolio-${i}`, src: `project/project-2-${i}.jpg`, anchos: [640, 1100, 1820], q: 60 })),
  ...rango(24).map((i) => ({ nombre: `galeria-${i}`, src: `gallery/gallery-${i}.png`, anchos: [320, 640, 910], q: 60 })),
  ...rango(31).map((i) => ({ nombre: `marca-${i}`, src: `brand/grandes/brand-${i}.png`, anchos: [300, 520], q: 70 })),
  // El original mide 160 px y trae márgenes transparentes: se recorta y se comprime poco
  { nombre: 'fernanda', src: 'update/thumb4.png', anchos: [160], q: 92, recorte: true },
  { nombre: 'contacto-fondo', src: 'update/bg.png', anchos: [960, 1920], q: 50 },
]

const videos = [
  { nombre: 'hero', src: `${SRC_V2}/dinoVideo0.mp4`, ancho: 960, crfMp4: 30 },
  { nombre: 'menu', src: `${SRC_V2}/dinoVideo1.mp4`, ancho: 640, crfMp4: 29 },
  { nombre: 'galeria-a', src: `${SRC_V2}/dinoVideo2.mp4`, ancho: 720, crfMp4: 30 },
  { nombre: 'galeria-b', src: `${SRC_V2}/dinoVideo3.mp4`, ancho: 720, crfMp4: 30 },
  // Original con fondo blanco: se invierte al codificar para no usar filter: invert() en cada
  // cuadro; el negro resultante se funde con el fondo mediante mix-blend-mode: lighten.
  {
    nombre: 'proceso',
    src: `${SRC}/step-video.mp4`,
    ancho: 1080,
    crfMp4: 30,
    filtro: 'negate',
  },
]

const hash = (archivo, ajustes) =>
  createHash('sha1').update(readFileSync(archivo)).update(JSON.stringify(ajustes)).digest('hex').slice(0, 8)

const manifiesto = { imagenes: {}, videos: {} }
const vigentes = new Set()
const ff = (...args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' })

for (const img of imagenes) {
  const archivo = join(SRC, img.src)
  const entrada = img.recorte ? await sharp(archivo).trim().png().toBuffer() : archivo
  const { width, height } = await sharp(entrada).metadata()
  const v = hash(archivo, img)
  const anchos = img.anchos.filter((w) => w <= width)
  if (!anchos.length) anchos.push(width)
  for (const w of anchos) {
    const base = sharp(entrada).resize({ width: w })
    for (const [formato, opts] of [
      ['avif', { quality: Math.max(img.q - 18, 30), effort: 6 }],
      ['webp', { quality: img.q, effort: 6 }],
    ]) {
      const salida = join(OUT, `${img.nombre}.${v}-${w}.${formato}`)
      vigentes.add(salida)
      if (!existsSync(salida)) await base.clone().toFormat(formato, opts).toFile(salida)
    }
  }
  manifiesto.imagenes[img.nombre] = { w: width, h: height, v, s: anchos }
}

// GIF de 10 MB: WebP animado con transparencia y 15 fps, con una versión ligera para móvil
manifiesto.orbe = {}
for (const [clave, ancho, q] of [['grande', 480, 55], ['chico', 200, 50]]) {
  const archivo = join(SRC, 'gift-img/title-img.gif')
  const ajustes = { ancho, fps: 15, q, alfa: true }
  const v = hash(archivo, ajustes)
  const salida = join(OUT, `orbe.${v}.webp`)
  vigentes.add(salida)
  if (!existsSync(salida)) {
    const tmp = join(tmpdir(), `orbe-${v}.gif`)
    ff('-i', archivo, '-filter_complex', `fps=${ajustes.fps},scale=${ancho}:-1:flags=lanczos,split[a][b];[a]palettegen=reserve_transparent=1[p];[b][p]paletteuse=alpha_threshold=128`, tmp)
    await sharp(tmp, { animated: true }).webp({ quality: q, alphaQuality: 70, effort: 6 }).toFile(salida)
    rmSync(tmp)
  }
  manifiesto.orbe[clave] = `/media/orbe.${v}.webp`
}

for (const vid of videos) {
  const v = hash(vid.src, vid)
  const nombre = `${vid.nombre}.${v}`
  const vf = `${vid.filtro ? vid.filtro + ',' : ''}scale=${vid.ancho}:-2`
  const mp4 = join(OUT, `${nombre}.mp4`)
  const poster = join(OUT, `${nombre}.webp`)
  ;[mp4, poster].forEach((f) => vigentes.add(f))
  if (!existsSync(mp4))
    ff('-i', vid.src, '-an', '-vf', vf, '-c:v', 'libx264', '-crf', String(vid.crfMp4), '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4)
  if (!existsSync(poster)) {
    const tmp = join(tmpdir(), `${nombre}.png`)
    ff('-ss', '1', '-i', vid.src, '-frames:v', '1', '-vf', vf, tmp)
    await sharp(tmp).webp({ quality: 55, effort: 6 }).toFile(poster)
    rmSync(tmp)
  }
  const { width, height } = await sharp(poster).metadata()
  manifiesto.videos[vid.nombre] = { v, w: width, h: height }
}

// Elimina versiones viejas generadas por este mismo script
for (const f of readdirSync(OUT)) if (!vigentes.has(join(OUT, f))) rmSync(join(OUT, f))

writeFileSync('src/data/media.json', JSON.stringify(manifiesto))

// Imagen para compartir en redes: el original mide 5000 px y pesa 517 KB
await sharp(join(SRC, 'preview.png')).resize(1200, 630).png({ palette: true, quality: 85, effort: 10 }).toFile('public/preview.png')

const total = readdirSync(OUT).reduce((s, f) => s + statSync(join(OUT, f)).size, 0)
console.log(`${readdirSync(OUT).length} archivos, ${(total / 1048576).toFixed(1)} MB en ${OUT}`)
