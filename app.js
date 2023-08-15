//Crea un endpoint llamado /trailer/:id que retorne la URL del trailer de la película o serie. Si ésta no posee video asociado, 
//que retorne un mensaje en formato JSON notificando la no disponibilidad del mismo.

//estas son diferentes app ejecutandose en diferentes indexs


const express = require('express');
const peliculas = require('./peliculas');
const app = express();
const path = require('path');
//const logger = require('morgan'); 

app.set('port', 3008);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine','ejs');

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
        const found = peliculas.find(element => element.codigo == codigo);

        found?.trailer ? res.send('ID:'+found.codigo+' Titulo: '+found.titulo+' Link al trailer:'+found.trailer):
        res.status(404).json({ id: 'Error', descripcion: 'El trailer de la pelicula con id = '+codigo+' no se encuentra disponible' });
        
    }
    
})

app.get('*',(req, res) => {
    res.json({error:'404', message:'No se encuentra la ruta o recurso solicitado'});
})

//Inicia el servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciando en el puerto '+app.get('port')+ '...');
})