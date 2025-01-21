import { upUser } from '../../../models/usr/upUser.js';
import { userModel } from '../../../models/usr/userModel.js';

const updateProfilePicture = async (req, res) => {
    try {
        const userIdFromParams = parseInt(req.params.userId, 10);
        const userIdFromAuth = req.user?.id;

        if (isNaN(userIdFromParams)) {
            return res.status(400).json({ message: 'ID de usuario no válido.' });
        }

        if (userIdFromAuth !== userIdFromParams) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar esta imagen de perfil.' });
        }

        const existingUser = await userModel.getUserById(userIdFromParams);
        if (!existingUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No se proporcionó una imagen de perfil.' });
        }

        if (existingUser.imagenPerfil) {
            await upUser.findByIdAndDelete(existingUser.imagenPerfil);
        }

        const nuevoArchivo = new upUser({
            nombre: req.file.originalname,
            tipo: req.file.mimetype,
            datos: req.file.buffer,
            usuarioId: userIdFromParams,
        });

        await nuevoArchivo.save();

        const updatedUser = await userModel.updateUserProfile(userIdFromParams, {
            imagenPerfil: nuevoArchivo._id,
        });

        return res.status(200).json({ message: 'Imagen de perfil actualizada correctamente.', user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar la imagen de perfil:', error);
        return res.status(500).json({ message: 'Error al actualizar la imagen de perfil.', error: error.message });
    }
};

export { updateProfilePicture };