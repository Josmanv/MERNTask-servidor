// Rutas para autenticar usuarios

const authController = require('../controllers/authController');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { check } = require('express-validator');

// Iniciar sesión
// api/auth'
router.post('/',
authController.autenticarUsuario);

//Obtiene el usuario autenticado
router.get('/',
auth,
authController.usuarioAutenticado
);

module.exports = router;