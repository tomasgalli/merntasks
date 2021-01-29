// importa express
const express = require('express');

// importa la conexión con la BD
const conectarDB = require('./config/db');

// importar CORS
const cors = require('cors');

// crear el servidor
const app = express();



// conectamos a la base de dato
conectarDB();

// habilitar CORS
app.use(cors());

// habilitar express.json
app.use(express.json({ extended: true }))

// puerto de la app
const port = process.env.PORT || 4000;      // si tiene valor, si  no 4000

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
