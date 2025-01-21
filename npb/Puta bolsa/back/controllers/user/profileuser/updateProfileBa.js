import { userModel } from '../../../models/usr/userModel.js';

const updateProfileB = async (req, res) => {
    try {
        const userIdFromParams = parseInt(req.params.userId, 10);
        const userIdFromAuth = req.user?.id;

        if (isNaN(userIdFromParams)) {
            return res.status(400).json({ message: 'ID de usuario no válido.' });
        }

        if (userIdFromAuth !== userIdFromParams) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar esta información.' });
        }

        const { primerNombre, primerApellido, segundoNombre, segundoApellido } = req.body;
        const existingUser = await userModel.getUserById(userIdFromParams);

        if (!existingUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const updateData = {};
        if (primerNombre) updateData.primerNombre = primerNombre;
        if (primerApellido) updateData.primerApellido = primerApellido;
        if (segundoNombre) updateData.segundoNombre = segundoNombre;
        if (segundoApellido) updateData.segundoApellido = segundoApellido;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron datos para actualizar.' });
        }

        const updatedUser = await userModel.updateUserProfile(userIdFromParams, updateData);
        return res.status(200).json({ message: 'Información del perfil actualizada correctamente.', user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar la información del perfil:', error);
        return res.status(500).json({ message: 'Error al actualizar la información del perfil.', error: error.message });
    }
};

export { updateProfileB };
