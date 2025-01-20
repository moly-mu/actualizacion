import { upUser } from '../../../models/usr/upUser.js';
import { userModel } from '../../../models/usr/userModel.js';

const updateProfileCV = async (req, res) => {
    try {
        const userIdFromParams = parseInt(req.params.userId, 10);
        const userIdFromAuth = req.user?.id;

        if (isNaN(userIdFromParams)) {
            return res.status(400).json({ message: 'ID de usuario no válido.' });
        }

        if (userIdFromAuth !== userIdFromParams) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar la hoja de vida.' });
        }

        const existingUser = await userModel.getUserById(userIdFromParams);
        if (!existingUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (!req.file) { // Cambio aquí para manejar req.file en lugar de req.files
            return res.status(400).json({ message: 'No se proporcionó un archivo de hoja de vida.' });
        }

        if (existingUser.hojaDeVida) {
            await upUser.findByIdAndDelete(existingUser.hojaDeVida);
        }

        const nuevoArchivo = new upUser({
            nombre: req.file.originalname,
            tipo: req.file.mimetype,
            datos: req.file.buffer,
            usuarioId: userIdFromParams,
        });

        await nuevoArchivo.save();

        const updatedUser = await userModel.updateUserProfile(userIdFromParams, {
            hojaDeVida: nuevoArchivo._id,
        });

        return res.status(200).json({ message: 'Hoja de vida actualizada correctamente.', user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar la hoja de vida:', error);
        return res.status(500).json({ message: 'Error al actualizar la hoja de vida.', error: error.message });
    }
};

export { updateProfileCV };