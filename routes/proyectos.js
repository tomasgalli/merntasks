const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea un proyecto
// route -> api/proyectos
router.post('/',            // les pasa a cada middleware req, res, next, etc... )
    auth,           // middleware
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto        // middleware
);

// obtener proyectos por usuario
router.get('/', 
    auth,
    proyectoController.obtenerProyectos
);

// actualizar proyecto via id
router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

// eliminar proyecto via id
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;