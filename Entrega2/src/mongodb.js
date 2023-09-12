const dotenv = require('dotenv');
dotenv.config()

const {MongoClient} = require('mongodb')
const URL = process.env.MONGODB_URLSTRING || ''
const client = new MongoClient(URL)

//CONEXIÓN CON JS CONVENSIONAL
async function conectToMongodb() {
    try {
        await client.connect()
        console.log('Conectado a MongoDB')
        return client
    } catch (error) {
        console.log('Error al conectar a MongoDB: ' + error)
        return null
    }
}

//DESCONEXIÓN CON ARROW FUNCTIONS
const disconnectToMongodb = async() => {
    try {
        await client.close()
        console.log('Desconectado de MongoDB')
    } catch (error) {
        console.log('Error al desconectar de MongoDB: ' + error)
    }
}

//EXPORTACIÓN
module.exports = {conectToMongodb, disconnectToMongodb}