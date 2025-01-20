const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const loginUser = async (req, res) => {
    const { correoElectronico, contrasena } = req.body;

    try {
        // Buscar al usuario por correo
        const user = await prisma.usuarioInfo.findFirst({
            where: { correoElectronico }, // Cambiar a findUnique si correoElectronico es único
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
};

module.exports = { loginUser };