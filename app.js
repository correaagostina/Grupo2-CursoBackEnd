//Crea un endpoint llamado /trailer/:id que retorne la URL del trailer de la película o serie. Si ésta no posee video asociado,
//que retorne un mensaje en formato JSON notificando la no disponibilidad del mismo.

//estas son diferentes app ejecutandose en diferentes indexs
const peliculas = require("./peliculas");

const express = require("express");
const app = express();
const path = require("path");
//const logger = require('morgan');

app.set("port", 3008);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//Definir ruta basica
app.get("/", (req, res) => {
  mensaje = {
    titulo: "Ruta raiz.",
  };
  res.render("index", mensaje);
});

// 4. Crea un endpoint llamado /reparto/:act que liste el catálogo que incluya a la actriz o actor
// indicado por el nombre. (la búsqueda del nombre debe ser parcial)
app.get("/reparto/:act", (req, res) => {
  console.log(typeof peliculas);
  console.log(req.params);
  // El valor ingresado lo paso a minúscula y le quito sus espacios.
  let actorIngresado = req.params.act.trim().toLowerCase();
  const actorEstaEnPelicula = (actor, pelicula) => {
    // A la lista de reparto que le saco los espacios de más y los pongo en minúscula para luego poder compararlo con el valor ingresado.
    const actoresEnMinuscula = pelicula.reparto.map((actor) =>
      actor.trim().toLowerCase()
    );
    console.log("esto es actoresEnMinuscula", actoresEnMinuscula);
    // El some comprueba si al menos un elemento del array (actoresEnMinuscula) cumple con la condición.
    // Es decir, va a ir por cada elemento del array para comparar si contiene ese string. (devuelve un booleano)
    // Una vez que cumple la condición, dará true, y comparo ese string con el ingresado, permitiendo así una búsqueda parcial.
    return actoresEnMinuscula.some((incluyeActor) => {
      return incluyeActor.includes(actor);
    });
  };
  // Utilizo el filter para filtrar ahora por ese string y busco si está o no en el catalógo por cada película.
  // A la función entonces de actorEstaEnPelicula le paso los 2 parametros, el actorIngresado y la pelicula.
  const filtrarCatalogo = peliculas.filter((pelicula) => {
    let result = actorEstaEnPelicula(actorIngresado, pelicula);
    return result;
  });

  // Luego utilizo el map para sólo devolver el titulo de la pelicula dónde aparece ese actor y el reparto de la misma.
  const devolverTitulo = filtrarCatalogo.map((pelicula) => {
    return {
      titulo: pelicula.titulo,
      reparto: pelicula.reparto,
    };
  });
  res.json(devolverTitulo);
  console.log(filtrarCatalogo, "qué viene de Catalogo x búsqueda x reparto");
});

app.get("*", (req, res) => {
  res.json({
    error: "404",
    message: "No se encuentra la ruta o recurso solicitado",
  });
});

//Inicia el servidor
app.listen(app.get("port"), () => {
  console.log("Servidor iniciando en el puerto " + app.get("port") + "...");
});
