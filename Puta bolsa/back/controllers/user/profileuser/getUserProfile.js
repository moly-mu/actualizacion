import { userModel } from '../../../models/usr/userModel.js';

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'ID de usuario no proporcionado.' });
        }

        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const { contrasena, ...userData } = user;
        return res.status(200).json(userData);
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        return res.status(500).json({ message: 'Error al obtener el perfil del usuario.' });
    }
};

export { getUserProfile };
