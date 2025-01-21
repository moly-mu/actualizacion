import express from 'express';
import { authRoutes } from './auth/authRoutes.js';
import { jobsRoutes } from './jobs/jobsRoutes.js';
import { dbjobs } from './jobs/dbjobs.js';
import { userRoutes } from './users/userRoutes.js';
import { companyRoutes } from './company/companyRoutes.js'; 
import { iaImproveRoutes } from '../iaImprove/index.js';

const router = express.Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas para trabajos
router.use('/jobs', jobsRoutes);

// Rutas para trabajos de la base de datos
router.use('/dbjobs', dbjobs);

// Rutas para usuarios (subida de archivos y perfil)
router.use('/users', userRoutes);

// Rutas para empresas (perfil y imagen de perfil)
router.use('/company', companyRoutes);

//Ruta de la IA
router.use('/iaImprove', iaImproveRoutes);

export { router };