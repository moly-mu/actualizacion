import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRETKEY_COMPANY;

// Middleware para verificar que el usuario es una "empresa"
const verifyEmpresa = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extraer el token del encabezado

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado.' });
    }

    // Verificar el token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        if (user.role !== 'empresa') {
            return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta.' });
        }

        req.user = user; // Adjuntar la información del usuario al request
        next(); // Continuar con el siguiente middleware o controlador
    });
};

export { verifyEmpresa };