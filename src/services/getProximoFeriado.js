import { hoy } from "../tools/fechas";
export const getProximoFeriado = (feriados) => {
  // Implementación del código para obtener el próximo feriado
  const newFeriados = feriados.map((feriado) => {
    const { fecha, tipo, nombre } = feriado;
    const [año, mes, dia] = fecha.split("-");
    return { dia, mes, año, tipo, nombre };
  });
  let fechaFeriado = newFeriados.find(
    (f) => (f.mes === hoy.mes && f.dia > hoy.dia) || f.mes > hoy.mes
  );

  if (!fechaFeriado) {
    fechaFeriado = newFeriados[0];
    hoy.fin = true;
  }
  return [fechaFeriado, hoy.fin];
};
