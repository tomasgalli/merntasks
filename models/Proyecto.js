const mongoose = require('mongoose')

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'      // tiene que ser el nombre que le pasamos al modelo del type
                            // relaciona los schemas

    },
    creado: {
        type: Date,
        default: Date.now       // importante no poner () porque ejecuta siempre la misma hora sino
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);