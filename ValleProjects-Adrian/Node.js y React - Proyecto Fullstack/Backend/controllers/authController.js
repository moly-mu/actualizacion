const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password });
        res.json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar usuario', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username, password } });
        if (user) {
            const token = jwt.sign({ userId: user.id }, 'tu_clave_secreta');
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
};