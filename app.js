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

app.get('/cursos',(req, res) => {
    res.send('<h1>Bienvenidas a nuestra seccion cursos!</h1>');
})

app.get('/trailer/:id',(req, res) => {
    console.log('Entra');
    let id = parseInt(req.params.id);
    if (typeof id === 'number') {
        let found = peliculas.find(element => element.codigo = id).trailer;
        console.log(found);
        if(found.trailer =! null){
            res.send('<h1>'+found+'</h1>');
        }
        //found = peliculas.prototype.find(({ codigo }) => codigo === id).trailer;
        else{
            res.setHeader('Content-Type', 'application/json');
            res.status(404).send("Lo siento, pero el link no esta disponible."); 
        }

    }else{
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send("La busqueda es erronea."); 
    }  
})

app.get('*',(req, res) => {
    res.json({error:'404', message:'No se encuentra la ruta o recurso solicitado'});
})

//Inicia el servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciando en el puerto '+app.get('port')+ '...');
})