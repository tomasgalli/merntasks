// conecta a la base de datos
const mongoose = require('mongoose');

// maneja los nombres para los distintos ambientes
require('dotenv').config({ path: 'variables.env' }) 

// conecta a bd
const conectarDB = async () => {
    try {
         // toma una url de db y un objeto de config
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });  
        console.log('DB Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);        // en caso de que haya un error detiene la app
    }
}

// disponibiliza la función
module.exports = conectarDB;    // sintaxis de node.js