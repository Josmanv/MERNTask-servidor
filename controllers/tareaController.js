const Tarea = require('../Models/Tarea');
const Proyecto = require('../Models/Proyecto');
const { validationResult } = require('express-validator');

// Crea una nueva tarea

exports.crearTarea = async (req, res) => {
     
    // Revisar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()});
     }

     // Extraer el proyecto y comprobar si existe

     try {
        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual pertencce al usuario autenticado
        if(existeProyecto.propietario.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

     } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
     }

}

// Obtiene todas las tareas del proyecto para el usuario actual

exports.obtenerTareas = async (req, res) => {
    try {

        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual pertencce al usuario autenticado
        if(existeProyecto.propietario.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Obtener las tareas por proyecto
        const tareas = await Tarea.find({proyecto}).sort({fechaCreacion: -1});
        res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}