// Rutas para autenticar usuarios

const authController = require('../controllers/authController');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { check } = require('express-validator');

// Iniciar sesión
// api/auth'
router.post('/',
[
    check('email', 'El email debe ser válido').isEmail(),
    check('password', 'El pass debe tener mínimoo 6 caracteres').isLength({min:6})
],
authController.autenticarUsuario);

//Obtiene el usuario autenticado
router.get('/',
auth,
authController.usuarioAutenticado
);

module.exports = router;