const dotenv = require('dotenv');
const express = require('express');
//const peliculas = require('./peliculas');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const {leerPeliculas, guardarPeliculas} = require('./src/trailerflix.manager');
//const logger = require('morgan'); 

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine','ejs');

const PORT = process.env.PORT || 3008;
let peliculas = [];

//Inicializamos middleware
dotenv.config();

//Activamos bodyParser para que interprete en formato json
app.use(bodyParser.json());

//Middleware para guardar en la variable peliculas el contenido el trailerflix.json
app.use((req,res,next)=>{
    peliculas = leerPeliculas();
    next();
})

//Definir ruta basica
app.get('/',(req, res) =>{
    mensaje = {
        titulo: "Ruta raiz."
    }
    res.render('index', mensaje);
});

app.get('/trailer/:id',(req, res) => {
    let codigo = parseInt(req.params.id);

    if (typeof codigo === 'number') {
        const found = peliculas.find(element => element.id == codigo);

        found?.trailer ? res.send('ID:'+found.id+' Titulo: '+found.titulo+' Link al trailer:'+found.trailer):
        res.status(404).json({ id: 'Error', descripcion: 'El trailer de la pelicula con id = '+codigo+' no se encuentra disponible' });
        
    }
    
})

app.get('*',(req, res) => {
    res.json({error:'404', message:'No se encuentra la ruta o recurso solicitado'});
})

//Inicia el servidor
app.listen(PORT, ()=>{
    console.log('Servidor iniciando en el puerto '+PORT+' ...');
})