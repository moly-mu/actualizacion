import express from 'express';
import { UserController } from '../../controllers/user/UserController.js';
import { CompanyController } from '../../controllers/company/CompanyController.js';

const router = express.Router();

// Registro de usuario - login
router.post('/register/user', UserController.registerUser);
router.post('/login/user', UserController.login);


// Registro de empresa - login
router.post('/register/company', CompanyController.registerCompany);
router.post('/login/company', CompanyController.loginCompany);


export { router as authRoutes };