const mongoose = require('mongoose');
mongoose.pluralize(null);
mongoose.set('useCreateIndex', true);

const ProyectoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    propietario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // referencia a la colección de Usuario
    },
    fechaCreacion:{
        type: Date,
        default: Date.now()
    }  
});

module.exports = mongoose.model('proyectos', ProyectoSchema);