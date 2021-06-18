const Usuario = require('../Models/Usuario');

exports.crearUsuario = async (req, res) => {

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
       
        // Guardar Usuario
        await usuario.save();

        // Mensaje de confirmación
        res.json({ msg: "Usuario registrado"});
        
    } catch (error) {
        console.log(error);
        res.status(400).send("Ha ocurrido un error");
    }
}