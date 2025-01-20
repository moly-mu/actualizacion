import mongoose from 'mongoose';
import { EmpresaModel } from '../models/EmpresaModel.js';
import { upEmpresa } from '../models/upEmpresa.js'; // Importación de upEmpresa

const EmpresaController = {
    getEmpresaProfile: async (req, res) => {
        try {
            const empresaId = req.user.id; // Obtener el ID de la empresa autenticada desde el token
            const empresa = await EmpresaModel.getEmpresaById(empresaId);

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }

            // Excluir la contraseña de los datos de la empresa
            const { contrasena, ...empresaData } = empresa;

            return res.status(200).json(empresaData);
        } catch (error) {
            console.error('Error al obtener el perfil de la empresa:', error);
            res.status(500).json({ message: 'Error al obtener el perfil de la empresa' });
        }
    },

    getEmpresaProfilePicture: async (req, res) => {
        try {
            const empresaId = req.user.id; // Obtener el ID de la empresa autenticada desde el token
            const empresa = await EmpresaModel.getEmpresaById(empresaId);

            if (!empresa || !empresa.imagenPerfil) {
                return res.status(404).json({ message: 'Imagen de perfil no encontrada' });
            }

            const imagenPerfil = await upEmpresa.findById(empresa.imagenPerfil); // Usar el modelo upEmpresa

            if (!imagenPerfil) {
                return res.status(404).json({ message: 'Archivo no encontrado' });
            }

            res.set('Content-Type', imagenPerfil.tipo);
            res.send(imagenPerfil.datos);
        } catch (error) {
            console.error('Error al obtener la imagen de perfil:', error);
            res.status(500).json({ message: 'Error al obtener la imagen de perfil' });
        }
    },

    updateEmpresaProfile: async (req, res) => {
        try {
            const empresaId = req.user.id; // Obtener el ID de la empresa autenticada desde el token
            const { razonSocial, sector, telefono, nombreEmpresa, ubicacion } = req.body;

            const empresa = await EmpresaModel.updateEmpresaProfile(empresaId, {
                razonSocial,
                sector,
                telefono,
                nombreEmpresa,
                ubicacion,
            });

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }

            return res.status(200).json({ message: 'Perfil de la empresa actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar el perfil de la empresa:', error);
            res.status(500).json({ message: 'Error al actualizar el perfil de la empresa' });
        }
    },

    updateEmpresaProfilePicture: async (req, res) => {
        try {
            const empresaId = req.user.id; // Obtener el ID de la empresa autenticada desde el token
            const { originalname, mimetype, buffer } = req.file;

            if (!buffer) {
                return res.status(400).json({ message: 'No se proporcionó una imagen de perfil' });
            }

            // Obtener empresa existente para validar o eliminar archivos
            const existingEmpresa = await EmpresaModel.getEmpresaById(empresaId);

            if (!existingEmpresa) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }

            // Si hay una nueva imagen, eliminar la antigua
            if (existingEmpresa.imagenPerfil) {
                try {
                    await upEmpresa.findByIdAndDelete(existingEmpresa.imagenPerfil); // Usar el modelo upEmpresa
                } catch (error) {
                    console.error('Error al eliminar la imagen antigua:', error);
                }
            }

            const nuevaImagen = new upEmpresa({
                nombre: originalname,
                tipo: mimetype,
                datos: buffer,
                usuarioId: empresaId
            });

            await nuevaImagen.save();

            const empresa = await EmpresaModel.updateEmpresaProfilePicture(empresaId, nuevaImagen._id);

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }

            return res.status(200).json({ message: 'Imagen de perfil actualizada correctamente' });
        } catch (error) {
            console.error('Error al actualizar la imagen de perfil:', error);
            res.status(500).json({ message: 'Error al actualizar la imagen de perfil' });
        }
    },
};

export { EmpresaController };