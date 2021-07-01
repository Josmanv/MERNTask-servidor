const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el servidor
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://proyectomern.netlify.app/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
  });


// conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

// Habilitsr express.json
app.use(express.json({extend: true}));

//Puerto de la app
const port = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios' , require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Arrancar ka app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
}); 