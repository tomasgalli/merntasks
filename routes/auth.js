// rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController')
const auth = require('../middleware/auth');

// Iniciar sesión
// route -> api/auth
router.post('/',
    // validación de campos
    authController.autenticarUsuario        // path,validacion,callback
);

// obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)
module.exports = router;