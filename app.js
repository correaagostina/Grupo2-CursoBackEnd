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

//Middleware para guardar en la variable peliculas el contenido de trailerflix.json
app.use((req, res, next) => {
  peliculas = leerPeliculas();
  next();
});

// Removedor de acentos y tildes
const removeAccents = (str) => {
return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//Definir ruta basica
app.get("/", (req, res) => {
  mensaje = {
    titulo: "Somos el grupo 2"
  }
  res.render("index", mensaje);
});

app.get("/catalogo", (req, res) => {
  res.render("catalogo", {peliculas:peliculas});
});

app.get("/titulo/:title", (req, res) => {
  let tituloIngresado = req.params.title.trim().toLowerCase().toUpperCase()
  const filtrarTitulo = peliculas.filter(t => t.titulo.toLowerCase().toUpperCase().includes(tituloIngresado))
  res.json(filtrarTitulo);
  console.log(tituloIngresado)
})

// 3. Crea un endpoint llamado /categoria/:cat que liste todo el contenido del archivo JSON de acuerdo
// a la categoría enviada como parámetro (serie o película) - usando filter

app.get('/categoria/:cat', (req, res) => {
  const categ = req.params.cat.trim().toLowerCase()
  const categoriaLimpia = removeAccents(categ);

  let filtrarCateg = peliculas.filter(cate => removeAccents(cate.categoria.toLowerCase()) === categoriaLimpia);

  if(categ === "serie" || categ === "película" || categ === "pelicula") {
  res.json(filtrarCateg);
  } else {
    res.status(404).json({id: 'Error', descripcion: 'No se encontraron coincidencias.'});
  }
});

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
