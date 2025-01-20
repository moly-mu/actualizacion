const express = require('express');
const authRoutes = require('./authRoutes');
const jobsRoutes = require('./jobsRoutes');

const router = express.Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas para trabajos
router.use('/jobs', jobsRoutes);

module.exports = router;
