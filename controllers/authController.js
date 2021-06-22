const Usuario = require('../Models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.autenticarUsuario = async (req, res) => {

     // Revisar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()});
     }

    // Extraer email y pasword *Destructuring
    const {email, password} = req.body;

    try {
        // Revisamos que el usuario esté registrado
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({ msg: "El usuario no existe"});
        }

        // Revisar el password
        const passCorrecto = await bcrypt.compare(password, usuario.password);

        if(!passCorrecto){
            return res.status(400).json({ msg: "El pass NO es correcto"});
        }

        // Crear y firmar el json web token
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // Firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 HORA
        }, (error, token) => {
            if(error) throw error;
            
            // Esto es lo mismo que res.json({ token: token }); llave y valor se llaman igual
            res.json({ token }); 
        });

        
    } catch (error) {
        console.log(error);
        res.status(400).send("Ha ocurrido un error");
    }
}

// Obtiene el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Ha ocurrido un error'});
    }
}