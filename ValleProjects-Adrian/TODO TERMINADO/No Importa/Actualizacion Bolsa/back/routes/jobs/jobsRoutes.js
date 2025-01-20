import express from 'express';
import { jobController } from '../../controllers/jobController.js';  
import { verifyUser } from '../../middleware/user/authuser.js';
import { verifyEmpresa } from '../../middleware/company/authempresa.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Definición de las rutas
router.get('/', jobController.getAllJobs);
router.get('/:jobId', jobController.getJobById);
router.post('/:jobId/apply', verifyUser, upload.single('hojaDeVida'), jobController.applyToJob);
router.post('/create', verifyEmpresa, jobController.createJob);
router.put('/:jobId', verifyEmpresa, jobController.updateJob);
router.delete('/:jobId', verifyEmpresa, jobController.deleteJob);
router.get('/:jobId/applications', verifyEmpresa, jobController.getApplicationsForJob);
router.put('/applications/:id/status', verifyEmpresa, jobController.updateApplicationStatus);
router.get('/empresa/jobs', verifyEmpresa, jobController.getJobsByEmpresa);
router.get('/user/aply', verifyUser, jobController.getUserApplications);

export { router as jobsRoutes };