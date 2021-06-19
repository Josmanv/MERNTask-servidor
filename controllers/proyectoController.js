const Proyecto = require('../Models/Proyecto');
const { validationResult } = require('express-validator');


exports.crearProyecto = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    // Crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);
    // Guardar el propietario via jwt
    proyecto.propietario = req.usuario.id;
    // Guardar el proyecto
    proyecto.save();
    res.json(proyecto);

    try {
       

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}