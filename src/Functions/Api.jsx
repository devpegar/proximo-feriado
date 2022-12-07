async function Api(url) {
  try {
    const respuesta = await fetch(url);
    const { datos } = await respuesta.json();
    return datos;
  } catch (error) {
    console.log(error);
  }
}

export default Api;
