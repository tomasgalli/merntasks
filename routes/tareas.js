const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth')



// Crear tareas
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio',),
        check('proyecto', 'El proyecto de la tarea es obligatorio',)
    ],
    tareaController.crearTarea
)

// Traer tareas de un proyecto
// api/tareas
router.get('/',
    auth,
    tareaController.obtenerTareas
)

// Actualizar tarea
// api/tareas
router.put('/:id',
    auth,
    tareaController.actualizarTarea
)

// Eliminar tarea
// api/tareas
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)

module.exports = router;