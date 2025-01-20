const express = require('express');
const { loginUser } = require('../../controllers/login/index');
const { registerUser } = require('../../controllers/register/index');

const router = express.Router();

router.post('/', loginUser);  // Ruta para login

module.exports = router;