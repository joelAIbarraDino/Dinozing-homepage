// Inserta el HTML de la página en dist/index.html para que buscadores y redes
// reciban el contenido completo sin ejecutar JavaScript.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const { render } = await import(pathToFileURL(resolve('.ssr/entry-server.js')).href)
const plantilla = readFileSync('dist/index.html', 'utf8')
if (!plantilla.includes('<!--app-html-->')) throw new Error('Falta <!--app-html--> en index.html')
const html = await render()
writeFileSync('dist/index.html', plantilla.replace('<!--app-html-->', () => html))
rmSync('.ssr', { recursive: true, force: true })
console.log(`Prerender listo: ${(html.length / 1024).toFixed(0)} KB de HTML`)
