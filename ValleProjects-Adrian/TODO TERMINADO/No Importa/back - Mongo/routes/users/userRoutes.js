import express from 'express';
import multer from 'multer';
import { UserController } from '../../controllers/usr.js';
import { upload } from '../../middleware/uploadMiddleware.js'; // Tu configuración personalizada de Multer
import { verifyUser } from '../../middleware/user/authuser.js'; // Middleware para autenticar usuarios
import { verifyEmpresa } from '../../middleware/company/authempresa.js';

const router = express.Router();

// Ruta para actualizar el perfil, incluyendo subida de archivos y verificación del usuario
router.put(
  '/update/:userId',
  [
    verifyUser, // Middleware de autenticación
    (req, res, next) => {
      // Middleware para manejar la subida de archivos
      upload.fields([
        { name: 'imagenPerfil', maxCount: 1 },
        { name: 'hojaDeVida', maxCount: 1 },
      ])(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          // Error específico de Multer (tamaño o tipo de archivo)
          return res.status(400).json({ message: 'Error al subir archivos', error: err.message });
        } else if (err) {
          // Otros errores inesperados
          return res.status(400).json({ message: 'Error inesperado', error: err.message });
        }
        next();
      });
    },
  ],
  UserController.updateProfile
);

// Nueva ruta para que la empresa y el usuario puedan obtener el PDF (hoja de vida) que suba la persona
router.get('/resumeu/:userId', verifyUser, UserController.getResume);
router.get('/resumee/:userId', verifyEmpresa, UserController.getResume);

// Nueva ruta para obtener los datos del usuario
router.get('/profile', verifyUser, UserController.getUserProfile);

// Nueva ruta para obtener la imagen de perfil del usuario
router.get('/profilepic', verifyUser, UserController.getUserProfilePicture); // Verifica que este controlador esté correctamente implementado

export { router as userRoutes };