const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para cerrar sesión
router.post('/logout', authController.logout);

// Ruta para resetear intentos fallidos (después de la verificación del teléfono)
router.post('/reset-attempts', authController.resetLoginAttempts);

// Ruta protegida para obtener el perfil del usuario
router.get('/perfil', authController.autenticarToken, (req, res) => {
  res.json({ message: `Bienvenido ${req.user.username}, user: req.user` });
});

module.exports = router;