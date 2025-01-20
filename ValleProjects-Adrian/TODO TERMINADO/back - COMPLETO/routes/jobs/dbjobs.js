import express from 'express';
import { DBjobController } from '../../jobs/index.js';  // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para obtener las ofertas de trabajo
router.get('/', DBjobController.getAllJobs);

export { router as dbjobs };