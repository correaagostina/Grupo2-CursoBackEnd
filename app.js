const dotenv = require("dotenv");
const express = require("express");
//const peliculas = require('./peliculas');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const {
  leerPeliculas,
  guardarPeliculas,
} = require("./src/trailerflix.manager");
//const logger = require('morgan');

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3008;
let peliculas = [];

//Inicializamos middleware
dotenv.config();

//Activamos bodyParser para que interprete en formato json
app.use(bodyParser.json());

//Middleware para guardar en la variable peliculas el contenido el trailerflix.json
app.use((req, res, next) => {
  peliculas = leerPeliculas();
  next();
});

//Definir ruta basica
app.get("/", (req, res) => {
  /*mensaje = {
    titulo: "Ruta raiz.",
  };
  res.render("index", mensaje);*/
  res.send(peliculas);
});

app.get("/titulo/:title", (req, res) => {
  let tituloIngresado = req.params.title.trim().toLowerCase()
  let filtrarTitulo = peliculas.filter(t => t.titulo.toLowerCase() === tituloIngresado)
  res.json(filtrarTitulo);
  console.log(tituloIngresado)
})

// 4. Crea un endpoint llamado /reparto/:act que liste el catálogo que incluya a la actriz o actor
// indicado por el nombre. (la búsqueda del nombre debe ser parcial)
app.get("/reparto/:act", (req, res) => {
  console.log(typeof peliculas);
  console.log(req.params);
  // El valor ingresado lo paso a minúscula y le quito sus espacios.
  let actorIngresado = req.params.act.trim().toLowerCase();
  const actorEstaEnPelicula = (actor, pelicula) => {
    // A la lista de reparto que le saco los espacios de más y los pongo en minúscula para luego poder compararlo con el includes.
    return pelicula.reparto.trim().toLowerCase().includes(actor);
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
});

app.get("/trailer/:id", (req, res) => {
  let codigo = parseInt(req.params.id);

  if (typeof codigo === "number") {
    const found = peliculas.find((element) => element.id == codigo);

    found?.trailer
      ? res.send(
          "ID:" +
            found.id +
            " Titulo: " +
            found.titulo +
            " Link al trailer:" +
            found.trailer
        )
      : res.status(404).json({
          id: "Error",
          descripcion:
            "El trailer de la pelicula con id = " +
            codigo +
            " no se encuentra disponible",
        });
  }
});

app.get("*", (req, res) => {
  res.json({
    error: "404",
    message: "No se encuentra la ruta o recurso solicitado",
  });
});

//Inicia el servidor
app.listen(PORT, () => {
  console.log("Servidor iniciando en el puerto " + PORT + " ...");
});
