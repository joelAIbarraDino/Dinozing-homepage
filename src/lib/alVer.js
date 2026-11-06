// Llama a cb(visible) según el elemento entra o sale del área visible (con margen).
export function alVer(el, cb, margen = '200px') {
  const io = new IntersectionObserver(([e]) => cb(e.isIntersecting), { rootMargin: margen })
  io.observe(el)
  return () => io.disconnect()
}
