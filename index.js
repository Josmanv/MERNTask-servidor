const express = require('express');
const conectarDB = require('./config/db');

//Crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// Habilitsr express.json
app.use(express.json({extend: true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios' , require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));

// Arrancar ka app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
}); 