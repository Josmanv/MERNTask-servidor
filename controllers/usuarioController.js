const Usuario = require('../Models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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