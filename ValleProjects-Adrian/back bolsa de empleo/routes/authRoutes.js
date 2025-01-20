const express = require('express');
const AuthController = require('../controllers/index');

const router = express.Router();

// Registro de usuario
router.post('/register/user', AuthController.registerUser);

// Registro de empresa
router.post('/register/company', AuthController.registerCompany);

// Inicio de sesión
router.post('/login/user', AuthController.login);
router.post('/login/company', AuthController.loginCompany);


module.exports = router;
