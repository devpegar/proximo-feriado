import { useState, useEffect } from "react";
import axios from "axios";
import { getWeatherHolyDay } from "../services/getWeatherHolyDay";
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

const optionsRequest = {};

function ProximoFeriado() {
  const [diaFeriado, setDiaFeriado] = useState("");
  const [mesFeriado, setMesFeriado] = useState("");
  const [nombreFeriado, setNombreFeriado] = useState("");
  const [tipoFeriado, setTipoFeriado] = useState("");
  const [cargando, setCargando] = useState(true);
  const [lista, setLista] = useState([]);

  if (!navigator.geolocation) {
    alert("Geolocation is not available");
    return;
  } else {
    const success = (pos) => {
      const coords = pos.coords;
      const { latitude, longitude } = coords;
      optionsRequest.method = "GET";
      optionsRequest.url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric&lang=es`;

      (async () => {
        const data = await getWeatherHolyDay(optionsRequest);
        setLista(data.list);
      })();
    };
    const error = (err) => {
      console.log(err);
    };
    const options = {
      maximumAge: 200000,
      enableHighAccuracy: false,
      timeout: 5000,
    };
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);
  }

  const url =
    hoy.year2 === 0
      ? `https://api.argentinadatos.com/v1/feriados/${hoy.year}`
      : `https://api.argentinadatos.com/v1/feriados/${hoy.year2}`;

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
    const { fecha, tipo, nombre } = feriado;
    setDiaFeriado(fecha.slice(8, 10));
    setMesFeriado(fecha.slice(5, 7));
    setNombreFeriado(nombre);
    setTipoFeriado(tipo.replace(/^\w/, (c) => c.toUpperCase()));

    setCargando(false);
  };
  const faltanDias = () => {
    const fechaInicio = new Date(`${hoy.mes}/${hoy.dia}/${hoy.year}`);
    if (hoy.year2 !== 0) {
      const fechaFinal = new Date(`${mesFeriado}/${diaFeriado}/${hoy.year2}`);
      const tiempo = fechaFinal.getTime() - fechaInicio.getTime();
      const dias = Math.floor(tiempo / (1000 * 60 * 60 * 24));
      return dias;
    } else {
      const fechaFinal = new Date(`${mesFeriado}/${diaFeriado}/${hoy.year}`);
      const tiempo = fechaFinal.getTime() - fechaInicio.getTime();
      const dias = Math.floor(tiempo / (1000 * 60 * 60 * 24));
      return dias;
    }
  };

  const nombreDia = () => {
    if (hoy.year2 !== 0) {
      return diaDeLaSemana(diaFeriado, mesFeriado, hoy.year2);
    } else {
      return diaDeLaSemana(diaFeriado, mesFeriado, hoy.year);
    }
  };

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
              {nombreDia()}, {diaFeriado} de {meses[parseInt(mesFeriado) - 1]}
            </h2>
          </div>
          <div className="py-5">
            <h2 className="font-montserrat italic text-arg-Marron text-4xl font-bold text-center py-5">
              {nombreFeriado}
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
            <p className="text-center text-arg-Marron text-xl">{tipoFeriado}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProximoFeriado;
