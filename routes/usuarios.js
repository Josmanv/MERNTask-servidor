// Rutas para crear usuairos

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

// Crea un usuario
// api/usuarios'
router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser válido').isEmail(),
    check('password', 'El pass debe tener mínimoo 6 caracteres').isLength({min:6})
],
 usuarioController.crearUsuario);

module.exports = router;