const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
   nombre: {
       type: String,
       required: true,
       trim: true
   },
   estado: {
       type: Boolean,
       required: true,
       default: false
   },
   creado: {
       type: Date,
       default: Date.now
   },
   proyecto: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Proyecto'      // es la referencia que se coloca más abajo, relaciona los modelos
   }
});

// ('nombre del modelo',Schema )
module.exports = mongoose.model('Tarea', TareaSchema);