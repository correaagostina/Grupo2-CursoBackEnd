# API DE COMPUTACIÓN


## Información
En esta API de computación utlizamos **CRUD**, **Express** y **MongoDB** para poder interactuar con recursos almacenados en la bb.dd.

## URL base
http://localhost:3300/

## Estructura 
```javascript
{
    "_id": "64ff7d14edd4d180dad005fb",
    "codigo": 9,
    "nombre": "Taejeta de video",
    "precio": 500,
    "categoria": "Partes de computadoras"
  },
  // ejemplo de la estructura del json computacion
  ```

  ##  Tablas 
|PETICION|URL|DESCRIPCION
|--:|:--|:--:|
| GET |[/computacion](http://localhost:3000/computacion)  | Obtener todos los productos
| GET |[/computacion/codigo/:id](http://localhost:3000/computacion)  | Obtener producto por su codigo
| GET|[/computacion/nombre/:nombre](http://localhost:3000/computacion)  | Obtener producto por su nombre
| POST|[/computacion](http://localhost:3000/computacion)  | Agregar un producto
| PUT|[/computacion/:codigo](http://localhost:3000/computacion)  | Actualizar un producto
| DELETE|[/computacion/:id](http://localhost:3000/computacion)  | Eliminar un producto 



## Metodo POST
 Este metodo crea un nuevo producto en nuestra colección de Computacion.

 ```javascript

 app.post("/computacion", async (req, res) => {
  const nuevoProducto = req.body
    if (nuevoProducto === undefined) {
        res.status(400).send('Error de formato.')
    }
    const client = await conectToMongodb();
    if (!client) {
        res.status(500).send('Error al conectarse a MongoDB')
        return;
    }
    const db = client.db('Grupo2') 
    const collection = await db.collection('computacion').insertOne(nuevoProducto)
        .then(() => {
            console.log('Nueva producto creado')
            res.status(201).send(nuevoProducto)
        }).catch(err => { 
            console.error(err)
        }).finally(() => { client.close()})
});

```

## Metodo DELETE

Este metodo elimina un producto de la colección Computacion.

```javascript
app.delete("/computacion/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Error en el formato del id");
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
        res.status(404).send("No sé ha podido encontrar el producto con id: " + id);
      } else {
        console.log("El Producto de computación con el id " + id + " ha sido eliminado");
        res.status(204).send("El Producto de computación con el id " + id + " ha sido eliminado");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Ha ocurrido un error al eliminar el producto");
    })
    .finally(() => {
      client.close();
    });
});
```


