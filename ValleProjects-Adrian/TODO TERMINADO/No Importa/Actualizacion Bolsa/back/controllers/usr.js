import fs from 'fs';
import path from 'path';
import { userModel } from '../models/userModel.js';  // Importa el objeto userModel

const getUserById = userModel.getUserById;
const updateUserProfile = userModel.updateUserProfile;

const UserController = {
    updateProfile: async (req, res) => {
        try {
            const userIdFromParams = parseInt(req.params.userId, 10);
            const userIdFromAuth = req.user?.id;

            // Verificar si el usuario autenticado tiene permiso para actualizar este perfil
            if (userIdFromAuth !== userIdFromParams) {
                return res.status(403).json({ message: 'No tienes permiso para actualizar este perfil.' });
            }

            // Si pasa la validación de autorización, continuar con el resto del proceso
            const { primerNombre, primerApellido, segundoNombre, segundoApellido, borrarImagen, borrarPDF } = req.body;

            // Obtener usuario existente para validar o eliminar archivos
            const existingUser = await getUserById(userIdFromParams);

            if (!existingUser) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            const updateData = {};

            // Manejar imagen de perfil
            if (req.files?.imagenPerfil) {
                // Si hay una nueva imagen, eliminar la antigua
                if (existingUser.imagenPerfil) {
                    const oldImagePath = path.join(__dirname, `../${existingUser.imagenPerfil}`);
                    try {
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    } catch (error) {
                        console.error('Error al eliminar la imagen antigua:', error);
                    }
                }
                updateData.imagenPerfil = `/uploads/profile_pictures/${req.files.imagenPerfil[0].filename}`;
            } else if (borrarImagen === 'true' && existingUser.imagenPerfil) {
                // Si se solicita borrar la imagen
                const oldImagePath = path.join(__dirname, `../${existingUser.imagenPerfil}`);
                try {
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                } catch (error) {
                    console.error('Error al eliminar la imagen:', error);
                }
                updateData.imagenPerfil = null;
            }

            // Manejar hoja de vida
            if (req.files?.hojaDeVida) {
                // Si hay un nuevo PDF, eliminar el anterior
                if (existingUser.hojaDeVida) {
                    const oldResumePath = path.join(__dirname, `../${existingUser.hojaDeVida}`);
                    try {
                        if (fs.existsSync(oldResumePath)) {
                            fs.unlinkSync(oldResumePath);
                        }
                    } catch (error) {
                        console.error('Error al eliminar la hoja de vida antigua:', error);
                    }
                }
                updateData.hojaDeVida = `/uploads/resumes/${req.files.hojaDeVida[0].filename}`;
            } else if (borrarPDF === 'true' && existingUser.hojaDeVida) {
                // Si se solicita borrar el PDF
                const oldResumePath = path.join(__dirname, `../${existingUser.hojaDeVida}`);
                try {
                    if (fs.existsSync(oldResumePath)) {
                        fs.unlinkSync(oldResumePath);
                    }
                } catch (error) {
                    console.error('Error al eliminar la hoja de vida:', error);
                }
                updateData.hojaDeVida = null;
            }

            // Manejar datos básicos
            if (primerNombre) updateData.primerNombre = primerNombre;
            if (primerApellido) updateData.primerApellido = primerApellido;
            if (segundoNombre) updateData.segundoNombre = segundoNombre;
            if (segundoApellido) updateData.segundoApellido = segundoApellido;

            // Si no hay datos para actualizar, retornar un error
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ message: 'No se proporcionaron datos para actualizar.' });
            }

            // Actualizar usuario
            const updatedUser = await updateUserProfile(userIdFromParams, updateData);

            return res.status(200).json({
                message: 'Perfil actualizado correctamente',
                user: updatedUser,
            });
        } catch (error) {
            console.error('Error en el controlador al actualizar el perfil:', error);
            return res.status(500).json({
                message: 'Error al actualizar el perfil del usuario',
                error: error.message,
            });
        }
    },

    getResume: async (req, res) => {
        try {
            const userId = parseInt(req.params.userId, 10);
            const user = await getUserById(userId);

            if (!user || !user.hojaDeVida) {
                return res.status(404).json({ message: 'Hoja de vida no encontrada' });
            }

            const filePath = path.join(__dirname, '..', user.hojaDeVida);
            if (fs.existsSync(filePath)) {
                res.sendFile(filePath);
            } else {
                res.status(404).json({ message: 'Archivo no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener la hoja de vida:', error);
            res.status(500).json({ message: 'Error al obtener la hoja de vida' });
        }
    },

    getUserProfile: async (req, res) => {
        try {
            const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token
            const user = await getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Excluir la contraseña de los datos del usuario
            const { contrasena, ...userData } = user;

            return res.status(200).json(userData);
        } catch (error) {
            console.error('Error al obtener el perfil del usuario:', error);
            res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
        }
    },

    getUserProfilePicture: async (req, res) => {
        try {
            const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token
            const user = await getUserById(userId);

            if (!user || !user.imagenPerfil) {
                return res.status(404).json({ message: 'Imagen de perfil no encontrada' });
            }

            const filePath = path.join(__dirname, '..', user.imagenPerfil);
            if (fs.existsSync(filePath)) {
                res.sendFile(filePath);
            } else {
                res.status(404).json({ message: 'Archivo no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener la imagen de perfil:', error);
            res.status(500).json({ message: 'Error al obtener la imagen de perfil' });
        }
    },
};

export { UserController };