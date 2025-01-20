import multer from 'multer';
import { upEmpresa } from '../models/upEmpresa.js';

// Configuración de almacenamiento para Multer (usando memoria)
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
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo: 5MB
});

// Middleware para guardar la imagen en MongoDB después de subirla
const uploadEmpresa = upload.single('imagenPerfil');

// Middleware para manejar la lógica de guardado en MongoDB
const handleUploadEmpresa = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se proporcionó una imagen de perfil' });
    }

    const { originalname, mimetype, buffer } = req.file;
    const usuarioId = req.user.id;

    try {
        // Crear un nuevo documento de imagen en MongoDB
        const nuevaImagen = new upEmpresa({
            nombre: originalname,
            tipo: mimetype,
            datos: buffer,
            usuarioId: usuarioId
        });

        // Guardar la imagen en la base de datos
        await nuevaImagen.save();

        // Adjuntar la ID de la nueva imagen al request
        req.imageId = nuevaImagen._id;

        next();
    } catch (error) {
        console.error('Error al guardar la imagen en la base de datos:', error);
        res.status(500).json({ message: 'Error al guardar la imagen en la base de datos' });
    }
};

export { uploadEmpresa, handleUploadEmpresa };