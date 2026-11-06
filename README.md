# Dinozign

Sitio de dinozign.com: Vue 3, Tailwind 4 y GSAP, prerenderizado a HTML estático.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run media` | Regenera `public/media` y `src/data/media.json` desde `media-src/` (requiere ffmpeg) |
| `npm run build` | Compila y prerenderiza en `dist/` |
| `npm run package` | Compila y crea `dinozign-hostinger.zip` |

## Cambiar una imagen o video

1. Reemplaza el original en `media-src/` (o agrégalo a la lista de `scripts/optimize-media.mjs`).
2. Ejecuta `npm run media`. El nombre generado cambia, así que la caché del navegador no estorba.
3. Úsalo con `<Imagen nombre="..." />` o `<VideoDiferido nombre="..." />`.

## Publicar en Hostinger

1. Ejecuta `npm run package`.
2. En hPanel, abre Administrador de archivos > `public_html`.
3. Respalda y elimina el contenido anterior del sitio. Conserva lo que no sea de la página.
4. Sube `dinozign-hostinger.zip` y extráelo dentro de `public_html`, no en una subcarpeta.
   La primera vez, sube también `dinozign.env` a la carpeta que contiene `public_html` (`domains/dinozign.com/`). No va dentro de `public_html`.
5. Comprueba que `.htaccess` esté presente (activa "mostrar archivos ocultos").
6. Purga la caché de Hostinger y revisa https://dinozign.com.

## Formulario de contacto y variables de entorno

El formulario envía a `/api/contacto.php`, que reenvía a n8n desde el servidor. La URL y el token viven en `dinozign.env`, fuera de `public_html`, así que no llegan al navegador ni al zip. El formato está en `dinozign.env.example`.

Para cambiar el token, edita `dinozign.env` en hPanel; no hace falta recompilar.

No uses variables `VITE_*` para secretos: Vite las copia dentro del JavaScript público.

Prueba local, sin Hostinger: `npm run build && php -S localhost:8000 -t dist`. Toma `dinozign.env` de la raíz del proyecto, así que un envío de prueba llega al n8n real. `npm run dev` no ejecuta PHP.
