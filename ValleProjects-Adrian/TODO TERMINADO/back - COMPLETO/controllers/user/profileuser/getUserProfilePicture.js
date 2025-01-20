import { upUser } from '../../../models/usr/upUser.js';
import { userModel } from '../../../models/usr/userModel.js';

const getUserProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'ID de usuario no proporcionado.' });
        }

        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (!user.imagenPerfil) {
            return res.status(404).json({ message: 'Imagen de perfil no encontrada.' });
        }

        const archivo = await upUser.findById(user.imagenPerfil);

        if (!archivo) {
            return res.status(404).json({ message: 'Archivo no encontrado.' });
        }

        res.set('Content-Type', archivo.tipo);
        return res.send(archivo.datos);
    } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
        return res.status(500).json({ message: 'Error al obtener la imagen de perfil.' });
    }
};

export { getUserProfilePicture };
