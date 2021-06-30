const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// Habilitar cors
// app.use(cors());

// Habilitsr express.json
app.use(express.json({extend: true}));

//Puerto de la app
// const port = process.env.PORT || 4000;


// Importar rutas
app.use('/api/usuarios' , require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


//habilitar cors
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());
 
//PUERTO DE LA APP
const port = process.env.PORT || 4000;
 
//ARRANCAR EL SERV.
app.listen(port, () => {
  console.log(`serv. corriendo en el puerto ${port} `);
});

// Arrancar ka app
// app.listen(port, '0.0.0.0', () => {
//     console.log(`El servidor esta funcionando en el puerto ${port}`);
// }); 