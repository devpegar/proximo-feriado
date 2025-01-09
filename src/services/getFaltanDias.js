import { hoy } from "../tools/fechas";
export const faltanDias = (dia, mes, año) => {
  const fechaActual = new Date(`${hoy.mes}-${hoy.dia}-${hoy.año}`);
  const fechaFeriado = new Date(`${mes}-${dia}-${año}`);

  if (!hoy.fin) {
    const tiempo = fechaFeriado.getTime() - fechaActual.getTime();
    const dias = Math.floor(tiempo / (1000 * 60 * 60 * 24));
    return dias;
  } else {
    const tiempo = fechaFeriado.getTime() - fechaActual.getTime();
    const dias = Math.floor(tiempo / (1000 * 60 * 60 * 24));
    return dias;
  }
};
