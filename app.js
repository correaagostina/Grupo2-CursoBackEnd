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
  let actIngresado = req.params.act.trim().toLowerCase();
  const actorEstaEnPelicula = (actor, pelicula) => {
    // Lista de actores que le saco los espacios de más y los pongo en minúscula.
    const actoresEnMinuscula = pelicula.reparto.map((actor) =>
      actor.trim().toLowerCase()
    );
    console.log("esto es actoresEnMinuscula", actoresEnMinuscula)
    // Para cada elemento lo que debo hacer es fijarme si contiene el string que yo estoy buscando.
    // El mismo va a ir por cada elemento del array para comparar si contiene ese string.
    // (Esto es porque reparto es un array de strings, por lo tanto debo comparar uno por uno).
    return actoresEnMinuscula.some((x) => {
      x.includes(actor);
    });
  };
  const filtrarCatalogo = peliculas.filter((pelicula) =>
    actorEstaEnPelicula(actIngresado, pelicula)
  );
  res.json(filtrarCatalogo);
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
