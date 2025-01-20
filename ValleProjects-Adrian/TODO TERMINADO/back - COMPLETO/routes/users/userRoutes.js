import express from 'express';
import { UserController } from '../../controllers/user/profileuser/index.js';
import { upload } from '../../middleware/user/uploadMiddleware.js'; 
import { verifyUser } from '../../middleware/user/authuser.js';
import { verifyEmpresa } from '../../middleware/company/authempresa.js';

const router = express.Router();

// Ruta para actualizar la imagen de perfil
router.put('/update/picture/:userId', verifyUser, upload.single('imagenPerfil'), UserController.updateProfilePicture);


// Ruta para actualizar la información básica del perfil
router.put('/update/basic/:userId', verifyUser, UserController.updateProfileB);

// Ruta para actualizar la hoja de vida
router.put('/update/cv/:userId', verifyUser, upload.single('hojaDeVida'), UserController.updateProfileCV);

// Nueva ruta para que la empresa y el usuario puedan obtener el PDF (hoja de vida) que suba la persona
router.get('/resumeu/:userId', verifyUser, UserController.getResume);
router.get('/resumee/:userId', verifyEmpresa, UserController.getResume);

// Nueva ruta para obtener los datos del usuario
router.get('/profile', verifyUser, UserController.getUserProfile);

// Nueva ruta para obtener la imagen de perfil del usuario
router.get('/profilepic', verifyUser, UserController.getUserProfilePicture);

export { router as userRoutes };
