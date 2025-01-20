import multer from 'multer';

// Configuración de almacenamiento para Multer (en memoria)
const storage = multer.memoryStorage();

// Filtros para validar el tipo de archivo permitido
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error('Tipo de archivo no permitido'), false); // Rechaza el archivo
    }
};

// Middleware de Multer
const uploadEmpresa = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo: 5MB
});

export { uploadEmpresa };