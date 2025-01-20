const express = require('express');
const { registerUser } = require('../../controllers/register/index');

const router = express.Router();

router.post('/', registerUser); // Ruta para manejar POST /api/register

module.exports = router;

