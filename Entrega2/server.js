//SERVIDOR
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//LLAMADO DE FUNCIONES
const { conectToMongodb, disconnectToMongodb } = require("./src/mongodb");
const { Collection, ObjectId } = require("mongodb");

//MIDDLEWARE
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

//RAIZ
app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API de Computación");
});

//ENDPOINTS
app.get("/computacion", async (req, res) => {
  const client = await conectToMongodb();
  if (!client) {
    res.status(500).send("Error al conectarse a MongoDB.");
    return;
  }
  const db = client.db("Grupo2");
  const computacion = await db.collection("computacion").find().toArray();
  await disconnectToMongodb();
  res.json(computacion);
});

app.get("/computacion/codigo/:id", async (req, res) => {});

app.get("/computacion/nombre/:nombre", async (req, res) => {});

//METODO DE CREACIÓN CON POST
app.post("/computacion", async (req, res) => {});

//METODO DE ACTUALIZACIÓN CON PUT
app.put("/computacion/:id", async (req, res) => {});

//METODO ELIMINAR CON DELETE
app.delete("/computacion/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Error en el formato del id recibido");
  }
  const client = await conectToMongodb();
  if (!client) {
    res.status(500).send("Error al conectarse a MongoDB");
    return;
  }
  client
    .connect()
    .then(() => {
      const collection = client.db("Grupo2").collection("computacion");
      return collection.deleteOne({ _id: new ObjectId(id) });
    })
    .then((resultado) => {
      console.log("consologear el resultado", resultado);
      if (resultado.deletedCount === 0) {
        res.status(404).send("No se pudo encontrar el producto con id: " + id);
      } else {
        console.log("Producto Eliminado");
        res.status(204).send("Producto Eliminado");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al eliminar el producto");
    })
    .finally(() => {
      client.close();
    });
});

//ENDPOINT QUE RESPONDE EN CASO DE ERROR
app.get("*", (req, res) => {
  res.json({ error: "404", message: "No se encontro la ruta solicitada." });
});

//INICIO DEL SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
