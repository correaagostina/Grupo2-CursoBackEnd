# API DE COMPUTACIÓN

## Ìndice
- [Informacion](#información)
- [URL base](#url-base)
- [Estructura](#estructura)
- [Tablas](#tablas)
- [Metodos](#metodos)
  - [Metodo POST](#metodo-post)
  - [Metodo DELETE](#metodo-delete)
  - [Metodo PUT](#metodo-put)
  - [Metodo GET](#metodo-get)

## Información
En esta API de computación utlizamos **CRUD**, **Express** y **MongoDB** para poder interactuar con recursos almacenados en la bb.dd.

## URL base
http://localhost:3000/

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


## Metodos

### Metodo POST
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

### Metodo DELETE

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

### Metodo PUT

Este metodo actualiza un producto existente de la colección Computacion.

```javascript
app.put("/computacion/:codigo", async (req, res) => {
  const codigo = parseInt(req.params.codigo) || 0;
  const datosNuevos = req.body
  if (!datosNuevos) {
    res.status(400).send('Error en el formato recibido.')
  }
  const client = await conectToMongodb();
  if (!client) {
    res.status(500).send('Error al conectarse a MongoDB')
    return;
  }
  const db = client.db('Grupo2')
  const collection = await db.collection('computacion').updateOne({codigo:codigo}, {$set: datosNuevos})
  .then(() => {
    let mensaje = 'Actualizado ID: ' + codigo
    res.status(200).json({ description: mensaje, objeto: datosNuevos})
  })
  .catch(err => {
    let mensaje = 'Error al actualizar ID: ' + codigo
    console.log(err)
    res.status(500).json({description: mensaje, objeto: datosNuevos})
  })
  .finally(() => {
    client.close()
  })

});
```

### Metodo GET

1. Este metodo se utiliza para obtener todos los productos. 

```javascript
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
```

2. Este metodo se utiliza para obtener un producto de computacion por su nombre. 

```javascript
app.get("/computacion/nombre/:nombre", async (req, res) => {
  const nombreProductoCompu = req.params.nombre;
  const client = await conectToMongodb();
  if (!client) {
    res.status(500).send("Error al conectarse a MongoDB");
    return;
  }
  const regex = new RegExp(nombreProductoCompu.toLowerCase(), "i");
  const db = client.db("Grupo2");
  const computacion = await db
    .collection("computacion")
    .find({ nombre: regex })
    .toArray();
  await disconnectToMongodb();
  computacion.length == 0
    ? res
        .status(404)
        .send("No sé ha podido encontrar el producto con nombre " + nombreProductoCompu)
    : res.json(computacion);
});
```

3. Este metodo se utiliza para obtener un producto de computacion por su id. 

```javascript
app.get("/computacion/codigo/:id", async (req, res) => {
  const idProducto = parseInt(req.params.id) || 0
  const client = await conectToMongodb();
  if (!client) {
      res.status(500).send('Error al conectarse a MongoDB')
      return;
  }
  const db = client.db('Grupo2')
  const producto = await db.collection('computacion').findOne({ codigo: idProducto})
  await disconnectToMongodb()
  !producto ? res.status(404).send('No se encuentra el producto con id '+ idProducto): res.json(producto)
});
```

