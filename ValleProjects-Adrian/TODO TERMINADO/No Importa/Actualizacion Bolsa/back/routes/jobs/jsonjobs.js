import express from 'express';
import { getJobs1, getJobs2, getJobs3 } from '../../jobs/index.js';

const router = express.Router();

// Ruta para obtener las ofertas de trabajo
router.get('/jobs1', getJobs1);
router.get('/jobs2', getJobs2);
router.get('/jobs3', getJobs3);

export { router as jsonjobs };