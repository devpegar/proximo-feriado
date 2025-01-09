import { useState, useEffect } from "react";
import axios from "axios";
import { getWeatherHolyDay } from "../services/getWeatherHolyDay";
import { getProximoFeriado } from "../services/getProximoFeriado";
import { faltanDias } from "../services/getFaltanDias";
import { hoy, nombreDia, nombreMes } from "../tools/fechas";
import Spinner from "./Spinner";

const optionsRequest = {};

function ProximoFeriado() {
  const [diaFeriado, setDiaFeriado] = useState("");
  const [mesFeriado, setMesFeriado] = useState("");
  const [añoFeriado, setAñoFeriado] = useState("");
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
    hoy.fin === false
      ? `https://api.argentinadatos.com/v1/feriados/${hoy.año}`
      : `https://api.argentinadatos.com/v1/feriados/${año2}`;

  useEffect(() => {
    axios(url).then(({ data }) => {
      // buscaFeriado(data);
      const [fechaFeriado, fin] = getProximoFeriado(data);
      const { dia, mes, año, nombre, tipo } = fechaFeriado;
      setDiaFeriado(dia);
      setMesFeriado(mes);
      setAñoFeriado(año);
      setNombreFeriado(nombre);
      setTipoFeriado(tipo.replace(/^\w/, (c) => c.toUpperCase()));

      if (fin) {
        const año2 = hoy.año + 1;
      }
      setCargando(false);
    });
  }, [hoy.fin]);

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
              {nombreDia(diaFeriado, mesFeriado, añoFeriado)}, {diaFeriado} de{" "}
              {nombreMes(mesFeriado)}
            </h2>
          </div>
          <div className="py-5">
            <h2 className="font-montserrat italic text-arg-Marron text-4xl font-bold text-center py-5">
              {nombreFeriado}
            </h2>
            <h3 className="text-arg-Marron text-4xl font-semibold text-center py-5 mt-5">
              {faltanDias(diaFeriado, mesFeriado, añoFeriado) !== 1
                ? "Faltan "
                : "Falta "}
              <span className="text-arg-Amarillo bg-arg-Marron py-2 px-6 rounded-full text-5xl font-bold drop-shadow-lg">
                {faltanDias(diaFeriado, mesFeriado, añoFeriado)}
              </span>{" "}
              {faltanDias(diaFeriado, mesFeriado, añoFeriado) !== 1
                ? "días"
                : "día"}
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
