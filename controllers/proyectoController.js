const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')


exports.crearProyecto = async ( req, res ) => {

    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {

        // crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        // guardar el creador via jwt
        proyecto.creador = req.usuario.id      // se llena en el middleware

        proyecto.save();
        res.json({proyecto});

        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error')
    };
};

// obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {       // busca por id de creador y trae los proyectos y los ordena por creado al revez
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    };
};

// actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {
    // devuelve errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() })
    }

    // extraer la 
    const { nombre } = req.body;

    const nuevoProyecto = {};

    if ( nombre ) {
        nuevoProyecto.nombre = nombre;
    };

    try {
        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        // si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // verificar el creador del proyecto ( capa extra de seguridad para que no pidan de otro usuario )
        if ( proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // actualizar
        proyecto = await Proyecto.findByIdAndUpdate(
            { _id: req.params.id, },
            { $set : nuevoProyecto },
            { new: true });
        
        res.json({proyecto});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    };

};

// elimina un proyecto por su id
exports.eliminarProyecto = async (req, res) => {
    try {
        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        // si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // verificar el creador del proyecto ( capa extra de seguridad para que no pidan de otro usuario )
        if ( proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // eliminar el proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id });
        res.json('Proyecto Eliminado');
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}