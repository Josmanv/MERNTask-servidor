const Usuario = require('../Models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.crearUsuario = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    // Extraer email y pasword *Destructuring
    const {email, password} = req.body;

    try {
        // Revisar que el usaurio registrado sea único
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({ msg: "El usuario ya está registrado"});
        }

        // Crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hasear el password
        const salt = await bcrypt.genSaltSync(10);
        usuario.password = await bcrypt.hashSync(password, salt);
       
        // Guardar Usuario
        await usuario.save();

        // Mensaje de confirmación
        res.json({ msg: "Usuario registrado"});
        
    } catch (error) {
        console.log(error);
        res.status(400).send("Ha ocurrido un error");
    }
}