const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const fechaActual = new Date();
const hoy = {
  dia: fechaActual.getDate(),
  mes: fechaActual.getMonth() + 1,
  año: fechaActual.getFullYear(),
  fin: false,
};

const nombreDia = (dia, mes, año) =>
  dias[new Date(`${mes}/${dia}/${año}`).getDay()];

const nombreMes = (mes) => meses[parseInt(mes) - 1];

export { hoy, nombreDia, nombreMes };
