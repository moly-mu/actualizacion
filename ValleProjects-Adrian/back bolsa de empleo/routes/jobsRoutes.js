const express = require('express');
const jobController = require('../controllers/jobController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Ruta para obtener todas las ofertas de trabajo
router.get('/', jobController.getAllJobs);

// Ruta para aplicar a un trabajo
router.post('/:jobId/apply', verifyToken, jobController.applyToJob);

// Ruta para crear un trabajo
router.post('/create', jobController.createJob);

router.get('/:jobId/applications', verifyToken, jobController.getApplicationsForJob);
module.exports = router;
