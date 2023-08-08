//estas son diferentes app ejecutandose en diferentes indexs
const express = require('express');
const app = express();
const path = require('path');
//const logger = require('morgan'); 

app.set('port', 3008);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine','ejs');
//app.use(express.static('views'));

const computerProducts = [{name: 'Notebook Lenovo', price: 720}, {name: 'Table Samsung 64gb', price: 230}, {name: 'MacBook Air 2020', price: 800}]

//Definir ruta basica
app.get('/',(req, res) =>{
    //res.writeHead(200,{'Contect-type':'text/html'});
    const data = {
        title: "Sitio web",
        message: "Esto es una prueba para ver el message.",
        products: computerProducts
    };
    res.render('index', data);
});

app.get('/cursos',(req, res) => {
    //res.writeHead(200,{'Contect-type':'text/html'});
    res.send('<h1>Bienvenidas a nuestra seccion cursos!</h1>');
})

app.get('/contacto',(req, res) => {
    //res.writeHead(200,{'Contect-type':'text/html'});
    res.send('<h1>Aqui puede ver nuestros datos de contacto...</h1>');
})

app.get('*',(req, res) => {
    //res.status(404).send('No se encuentra la ruta o recurso solicitado');
    res.json({error:'404', message:'No se encuentra la ruta o recurso solicitado'});
})

//Inicia el servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciando en el puerto '+app.get('port')+ '...');
})