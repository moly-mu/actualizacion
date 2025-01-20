import express from 'express';
import { authRoutes } from './auth/authRoutes.js';
import { jobsRoutes } from './jobs/jobsRoutes.js';
import { jsonjobs } from './jobs/jsonjobs.js';
import { userRoutes } from './users/userRoutes.js';
import { companyRoutes } from './company/companyRoutes.js'; 
import { iaImproveRoutes } from '../iaImprove/index.js';

const router = express.Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas para trabajos
router.use('/jobs', jobsRoutes);

// Rutas para trabajos del JSON
router.use('/jsonjobs', jsonjobs);

// Rutas para usuarios (subida de archivos y perfil)
router.use('/users', userRoutes);

// Rutas para empresas (perfil y imagen de perfil)
router.use('/company', companyRoutes);

//Ruta de la IA
router.use('/iaImprove', iaImproveRoutes);

export { router };

router.use('/jobs', jobsRouter);