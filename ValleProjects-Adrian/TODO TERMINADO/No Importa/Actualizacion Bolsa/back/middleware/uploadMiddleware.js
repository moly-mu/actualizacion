import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Convierte import.meta.url a __dirname 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Definir carpetas según el tipo de archivo
        const folder = file.fieldname === 'imagenPerfil' ? 'profile_pictures' : 'resumes';
        cb(null, path.join(__dirname, `../uploads/${folder}`)); // Almacena en /uploads/{folder}
    },
    filename: (req, file, cb) => {
        // Renombrar el archivo para evitar conflictos (agregar timestamp)
        const timestamp = Date.now();
        const originalName = file.originalname;
        cb(null, `${timestamp}-${originalName}`);
    },
});

// Filtros para validar el tipo de archivo permitido
const fileFilter = (req, file, cb) => {
    if (
        (file.fieldname === 'imagenPerfil' && file.mimetype.startsWith('image/')) ||
        (file.fieldname === 'hojaDeVida' && file.mimetype === 'application/pdf')
    ) {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error('Tipo de archivo no permitido'), false); // Rechaza el archivo
    }
};

// Middleware de Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo: 5MB
});

export { upload };
