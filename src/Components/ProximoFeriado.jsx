import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

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
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const fechaActual = new Date();
const hoy = {
  dia: fechaActual.getDate(),
  mes: fechaActual.getMonth() + 1,
  year: fechaActual.getFullYear(),
  year2: 0,
};
const diaDeLaSemana = (dia, mes, year) =>
  dias[new Date(`${mes}/${dia}/${year}`).getDay()];

function ProximoFeriado() {
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(true);
  const url =
    hoy.year2 === 0
      ? `https://nolaborables.com.ar/api/v2/feriados/${hoy.year}`
      : `https://nolaborables.com.ar/api/v2/feriados/${hoy.year2}`;

  useEffect(() => {
    axios(url).then(({ data }) => {
      buscaFeriado(data);
    });
  }, [hoy.year2]);

  const buscaFeriado = (feriados) => {
    let feriado = feriados.find(
      (f) => (f.mes === hoy.mes && f.dia > hoy.dia) || f.mes > hoy.mes
    );

    if (!feriado) {
      feriado = feriados[0];
      hoy.year2 = hoy.year + 1;
    }
    setResultado(feriado);
    setCargando(false);
  };
  const faltanDias = () => {
    const { dia, mes } = resultado;
    const fechaInicio = new Date(`${hoy.mes}/${hoy.dia}/${hoy.year}`);
    if (hoy.year2 !== 0) {
      const fechaFinal = new Date(`${mes}/${dia}/${hoy.year2}`);
      const tiempo = fechaFinal.getTime() - fechaInicio.getTime();
      const dias = Math.floor(tiempo / (1000 * 60 * 60 * 24));
      return dias;
    } else {
      const fechaFinal = new Date(`${mes}/${dia}/${hoy.year}`);
      const tiempo = fechaFinal.getTime() - fechaInicio.getTime();
      const dias = Math.floor(tiempo / (1000 * 60 * 60 * 24));
      return dias;
    }
  };
  const { dia, mes, motivo, info } = resultado;
  const nombreDia =
    hoy.year2 !== 0
      ? diaDeLaSemana(dia, mes, hoy.year2)
      : diaDeLaSemana(dia, mes, hoy.year);
  return (
    <section className="container laptop:max-w-3xl mx-auto flex justify-center items-center">
      {cargando ? (
        <Spinner />
      ) : (
        <div className="w-full">
          <div className="flex flex-col tablet:flex-row justify-between items-center py-5">
            <h1 className="text-arg-Marron text-4xl font-bold">
              Próximo feriado
            </h1>
            <h2 className="text-arg-Marron text-xl font-semibold">
              {nombreDia}, {dia} de {meses[mes - 1]}
            </h2>
          </div>
          <div className="py-5">
            <h2 className="font-montserrat italic text-arg-Marron text-4xl font-bold text-center py-5">
              {motivo}
            </h2>
            <h3 className="text-arg-Marron text-4xl font-semibold text-center py-5 mt-5">
              {faltanDias() !== 1 ? "Faltan " : "Falta "}
              <span className="text-arg-Amarillo bg-arg-Marron py-2 px-6 rounded-full text-5xl font-bold drop-shadow-lg">
                {faltanDias()}
              </span>{" "}
              {faltanDias() !== 1 ? "dias" : "día"}
            </h3>
          </div>
          <div>
            <p className="text-center text-arg-Marron text-xl">
              Más info en:{" "}
              <span>
                <a
                  className="hover:text-white transition-color duration-300"
                  href={info}
                >
                  Wikipedia
                </a>
              </span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProximoFeriado;
