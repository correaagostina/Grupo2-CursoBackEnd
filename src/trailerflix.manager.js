const fs = require('fs');

function leerPeliculas(){
    //Lee el archivo
    const datos = fs.readFileSync(__dirname + process.env.DATABASE_PATH, 'utf-8');
    const peliculas = JSON.parse(datos);

    return peliculas;
}

//Se exportan las dos funciones
module.exports = {leerPeliculas}