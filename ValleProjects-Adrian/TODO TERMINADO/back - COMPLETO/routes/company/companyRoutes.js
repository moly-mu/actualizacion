import express from 'express';
import { EmpresaController } from '../../controllers/company/profilecompany/comp.js'; 
import { verifyEmpresa } from '../../middleware/company/authempresa.js';
import { uploadEmpresa} from '../../middleware/company/uploadMiddlewareEmp.js';

const router = express.Router();

// Rutas para obtener el perfil de la empresa, su imagen de perfil y actualizar la imagen de perfil
router.get('/perfil', verifyEmpresa, EmpresaController.getEmpresaProfile);
router.get('/per', verifyEmpresa, EmpresaController.getEmpresaProfilePicture);
router.put('/perfil', verifyEmpresa, EmpresaController.updateEmpresaProfile);
router.put('/perfil/imagen', verifyEmpresa, uploadEmpresa.single('imagenPerfil'), EmpresaController.updateEmpresaProfilePicture);

export { router as companyRoutes };