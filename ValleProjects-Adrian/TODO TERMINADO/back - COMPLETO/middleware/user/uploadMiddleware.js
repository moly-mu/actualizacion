import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (
        (file.fieldname === 'imagenPerfil' && file.mimetype.startsWith('image/')) ||
        (file.fieldname === 'hojaDeVida' && file.mimetype === 'application/pdf')
    ) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export { upload };