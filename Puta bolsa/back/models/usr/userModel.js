import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userModel = {
    /**
     * Actualiza el perfil de un usuario en la base de datos.
     * @param {number} userId - ID del usuario a actualizar.
     * @param {object} updateData - Datos a actualizar (incluyendo rutas de archivos).
     * @returns {object} - Usuario actualizado.
     */
    updateUserProfile: async (userId, updateData) => {
        try {
            // Asegurarse de que al menos uno de los campos a actualizar está presente
            if (Object.keys(updateData).length === 0) {
                throw new Error('No se proporcionaron datos para actualizar.');
            }

            const updatedUser = await prisma.usuarioInfo.update({
                where: { id: userId },
                data: updateData,
            });

            return updatedUser;
        } catch (error) {
            console.error('Error al actualizar el usuario en el modelo:', error);
            throw new Error(error.message || 'Error al actualizar el usuario.');
        }
    },

    /**
     * Obtiene un usuario por su ID.
     * @param {number} userId - ID del usuario a obtener.
     * @returns {object} - Usuario encontrado o null si no existe.
     */
    getUserById: async (userId) => {
        try {
            return await prisma.usuarioInfo.findUnique({
                where: {
                    id: parseInt(userId, 10), // Asegúrate de convertir userId a entero
                },
            });
        } catch (error) {
            console.error('Error al obtener el usuario por ID:', error);
            throw error;
        }
    },
};

export { userModel };
