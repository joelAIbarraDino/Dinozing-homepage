// Orden aleatorio por pesos acumulados: cada posición se sortea entre los elementos restantes,
// y a mayor peso, más probabilidad de salir antes. Ningún elemento se repite ni se pierde.
export function ordenPonderado(elementos, pesoDe, azar = Math.random) {
  const restantes = [...elementos]
  const orden = []
  while (restantes.length) {
    const total = restantes.reduce((suma, e) => suma + pesoDe(e), 0)
    const punto = azar() * total
    let acumulado = 0
    const i = restantes.findIndex((e) => (acumulado += pesoDe(e)) > punto)
    // El redondeo decimal puede dejar el punto justo al final: toca el último
    orden.push(...restantes.splice(i === -1 ? restantes.length - 1 : i, 1))
  }
  return orden
}
