const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

// crea una nueva tarea
exports.crearTarea = async (req, res) => {

    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }




    try {
        // extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if ( !existeProyecto ) {
            res.status(404).json({ msg: 'Proyecto no encontrado' });
        };
        // revisar si el proyecto actual pertenece al usuario autenticado
        if ( existeProyecto.creador.toString() !== req.usuario.id ) {
            res.status(401).json({ msg: 'No autorizado' });
        }

        // creamos la tarea  
        const tarea = new Tarea(req.body);

        await tarea.save();
        res.json({ tarea });


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

};

exports.obtenerTareas = async (req, res) => {
    
    try {
        // extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;     // Cuando se manda en params se recibe con query
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if ( !existeProyecto ) {
            res.status(404).json({ msg: 'Proyecto no encontrado' });

        };

        // revisar si el proyecto actual pertenece al usuario autenticado
        if ( existeProyecto.creador.toString() !== req.usuario.id ) {
            res.status(401).json({ msg: 'No autorizado' });
        }

        // traemos las tareas
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1});
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

};

// actualizar tarea
exports.actualizarTarea = async (req, res) => {

    try {
        // extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;
        
        // revisar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if ( !tarea ) {
            return res.status(404).json({ msg: 'No existe la tarea' });
        };

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // revisar si el proyecto actual pertenece al usuario autenticado
        if ( existeProyecto.creador.toString() !== req.usuario.id ) {
            res.status(401).json({ msg: 'No autorizado' });
        }

        // crear un objeto con la nueva información
        const nuevaTarea = {};

        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        // guardar tarea
        tarea = await Tarea.findOneAndUpdate(
            { _id: req.params.id }, nuevaTarea, { new: true }
            );

        res.json({ tarea });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// eliminar tarea
exports.eliminarTarea = async (req, res) => {

    try {
         // extraer el proyecto y comprobar si existe
         const { proyecto } = req.query;
        
         // revisar si la tarea existe o no
         let tarea = await Tarea.findById(req.params.id);
 
         if ( !tarea ) {
             return res.status(404).json({ msg: 'No existe la tarea' });
         };
 
         // extraer proyecto
         const existeProyecto = await Proyecto.findById(proyecto);
 
         // revisar si el proyecto actual pertenece al usuario autenticado
         if ( existeProyecto.creador.toString() !== req.usuario.id ) {
             res.status(401).json({ msg: 'No autorizado' });
         }

         // eliminar tarea
         await Tarea.findOneAndRemove({ _id : req.params.id });
 
         res.json({ msg: 'Tarea Eliminada' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
