import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRETKEY_USER;

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token no proporcionado o inválido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

export { verifyUser };
