//SERVIDOR
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//LLAMADO DE FUNCIONES
const {conectToMongodb, disconnectToMongodb} = require('./src/mongodb');
const { Collection } = require('mongodb');

//MIDDLEWARE
app.use((req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
});

//RAIZ
app.get('/', (req, res) => {
    res.status(200).end('Bienvenido a la API de Frutas');
});

//ENDPOINTS
app.get('/frutas', async (req, res) => {
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const db = client.db('Grupo2')
    const computacion = await db.collection('computacion').find().toArray()
    await disconnectToMongodb()
    res.json(Frutas)
});

app.get('/frutas/:id', async (req, res) => {
    const frutasID = parseInt(req.params.id) || 0 //en caso de indefinido que devuelva 0
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const db = client.db('Grupo2')
    const Fruta = await db.collection('computacion').findOne({id: frutasID})
    await disconnectToMongodb()
    !Fruta ? res.status(404).send('No se encontro la fruta con el id: ' + frutasID) : res.json(Fruta)
});

app.get('/frutas/nombre/:nombre', async (req, res) => {
    const nombreFruta = req.params.nombre
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const regex = new RegExp(nombreFruta.toLowerCase(), 'i');
    const db = client.db('Frutas')
    const Frutas = await db.collection('Frutas').find({nombre: regex}).toArray()
    await disconnectToMongodb()
    Frutas.length == 0 ? res.status(404).send('No se encontro la fruta con el nombre: ' + nombreFruta) : res.json(Frutas);
});

app.get('/frutas/precio/:precio', async (req, res) => {
    const precioFruta = parseInt(req.params.precio) || 0 //en caso de indefinido que devuelva 0
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const db = client.db('Frutas')
    const Frutas = await db.collection('Frutas').find({importe: {$gte: precioFruta}}).toArray()
    await disconnectToMongodb()
    Frutas.length == 0 ? res.status(404).send('No se encontro la fruta con el nombre: ' + precioFruta) : res.json(Frutas);
});

//METODO DE CREACIÓN CON POST
app.post('/frutas', async (req, res) => {
    const nuevaFruta = req.body
    if(nuevaFruta === undefined) {
        res.status(400).send('Error en el formato de la fruta')
    }
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const db = client.db('Frutas')
    const collection = await db.collection('Frutas').insertOne(nuevaFruta)
    .then(() => {
        console.log('Se creo una nueva fruta.')
        res.status(201).send(nuevaFruta)
    }).catch(error => {
        console.error(error)
    }).finally(() => {
        client.close()
    })
});

//METODO DE ACTUALIZACIÓN CON PUT
app.put('/frutas/:id', async (req, res) => {
    const id = parseInt(req.params.id) || 0;
    const nuevosDatos = req.body
    if(!nuevosDatos) {
        res.status(400).send('Error en el formato de datos recibidos.')
    }
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const db = client.db('Frutas')
    const collection = await db.collection('Frutas').updateOne({id: id}, { $set: nuevosDatos })
    .then(() => {
        console.log('Se actualizo la fruta.')
        res.status(200).send(nuevosDatos)
    }).catch(err => {
        console.error(err)
    }).finally(() => {
        client.close()
    })
});

//METODO ELIMINAR CON DELETE
app.delete('/frutas/:id', async (req, res) => {
    const id = parseInt(req.params.id) || 0;
    if(!id) {
        res.status(400).send('Error en el id recibido.')
    }
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    client.connect()
        .then(() => {
            const collection = client.db('Frutas').collection('Frutas')
            return collection.deleteOne({id:id})
        }).then((resultado) => {
            if (resultado.deletedCount === 0) {
                res.status(404).send('No se pudo encontrar la fruta con id: ' + id)
            } else {
                console.log('Fruta Eliminada')
                res.status(204).send('Fruta Eliminada')
            }
        }).catch((err) => {
            console.error(err)
            res.status(500).send('Error al eliminar fruta')
        }).finally(() => {
            client.close()
        })
});

//METODO PARA MODIFICAR CON PATCH
app.patch('/frutas/:id', async (req, res) => {
    const id = parseInt(req.params.id) || 0;
    const nuevosDatos = req.body
    if(!nuevosDatos) {
        res.status(400).send('Error en el formato de datos recibidos.')
    }
    const client = await conectToMongodb();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB.')
        return;
    }
    const db = client.db('Frutas')
    const collection = await db.collection('Frutas').updateOne({id: id}, { $set: nuevosDatos })
    .then(() => {
        console.log('Se actualizo la fruta.')
        res.status(200).send(nuevosDatos)
    }).catch(err => {
        console.error(err)
    }).finally(() => {
        client.close()
    })
});

//ENDPOINT QUE RESPONDE EN CASO DE ERROR
app.get('*', (req, res) => {
    res.json({ error: '404', message: 'No se encontro la ruta solicitada.' });
});

//INICIO DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});