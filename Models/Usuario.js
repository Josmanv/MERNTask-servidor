const mongoose = require('mongoose');
/*Si no se especifica, mongodb creará una colección por defecto con el nombre de tu modelo 
en minusculas y pluralizado. Para crear esta colección con el nombre exacto de tu modelo, podemos 
uyilizar mongoose.pluralize(null);*/
mongoose.pluralize(null);

// necesario para quitar mensaajes de deprecated
mongoose.set('useCreateIndex', true);

const UsuariosSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    registro:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);