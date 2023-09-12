//acá se levantan los servidores
const app = require('./app');

async function main (){
    await app.listen(process.env.PORT);
    console.log('Server on port', process.env.PORT);
}

main();