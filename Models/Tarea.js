const mongoose = require('mongoose');
mongoose.pluralize(null);
mongoose.set('useCreateIndex', true);

const TareaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    estado:{
        type: Boolean,
        default: false
    },
    fechaCreacion:{
        type: Date,
        default: Date.now()
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proyectos' // esta referencia debe ser el nombre de la colección, en este caso la llamé proyectos
    }  
});

module.exports = mongoose.model('tareas', TareaSchema);