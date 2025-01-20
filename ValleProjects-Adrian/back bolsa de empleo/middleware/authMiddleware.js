// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extraer el token del encabezado

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado.' });
    }

    // Verificar el token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        req.user = user; // Adjuntar la información del usuario al request
        next(); // Continuar con el siguiente middleware o controlador
    });
};

module.exports = verifyToken;
