// Calendario embebido de Cal.com, adaptado de su código oficial de inserción.
// Su script solo se pide cuando esta función se llama.
export function iniciarCal(contenedor, enlace) {
  const w = window
  if (!w.Cal) {
    const cal = function (...args) {
      if (!cal.loaded) {
        cal.ns = {}
        cal.q = cal.q || []
        const script = document.createElement('script')
        script.src = 'https://app.cal.com/embed/embed.js'
        document.head.appendChild(script)
        cal.loaded = true
      }
      if (args[0] === 'init') {
        const api = (...a) => api.q.push(a)
        api.q = []
        const espacio = args[1]
        cal.ns[espacio] = cal.ns[espacio] || api
        cal.ns[espacio].q.push(args)
        cal.q.push(['initNamespace', espacio])
        return
      }
      cal.q.push(args)
    }
    w.Cal = cal
  }

  const estilo = { theme: 'dark', cssVarsPerTheme: { dark: { 'cal-brand': '#59f22e' } }, hideEventTypeDetails: false, layout: 'month_view' }
  w.Cal('init', 'sesion', { origin: 'https://app.cal.com' })
  w.Cal.ns.sesion('inline', { elementOrSelector: contenedor, calLink: enlace, config: { layout: 'month_view', theme: 'dark' } })
  w.Cal.ns.sesion('ui', estilo)
}
