const Proyecto = require('../Models/Proyecto');
const { validationResult } = require('express-validator');


exports.crearProyecto = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        // Guardar el propietario via jwt
        proyecto.propietario = req.usuario.id;
        // Guardar el proyecto
        proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}


// Obtiene todod los proyectos del usuario actual

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({propietario: req.usuario.id}).sort({fechaCreacion: -1});
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}

// Actualiza un proyecto

exports.actualizarProyecto = async (req, res) => {

    // Revisar si hay errores a la hora de actualizar
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    // Extraer la infomración del proyecto
    const {nombre} = req.body;
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre
    }
    try {

        // Revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        // Si el pryecto existe o no
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Verificar el propietario del proyecto
        if(proyecto.propietario.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Actualizar el proyecto
        proyecto = await Proyecto.findByIdAndUpdate(
            {_id: req.params.id}, 
            {$set: nuevoProyecto}, 
            {new: true}
            );

            res.json({proyecto});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}