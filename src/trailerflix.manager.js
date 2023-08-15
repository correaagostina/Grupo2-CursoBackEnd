const fs = require('fs');

function leerPeliculas(){
    //Lee el archivo
    const datos = fs.readFileSync(__dirname + process.env.DATABASE_PATH, 'utf-8');
    const frutas = JSON.parse(datos);

    return frutas;
}

//Esta funcion recibe por parametros un array de objetos manipulado desde server.js, lo convierte a String para guardar el contenido en el archivo trailerflix.json
function guardarPeliculas(peliculas){
    const datos = JSON.stringify(peliculas);
    fs.writeFileSync(__dirname + process.env.DATABASE_PATH, datos);
}

//Se exportan las dos funciones
module.exports = {leerPeliculas, guardarPeliculas}