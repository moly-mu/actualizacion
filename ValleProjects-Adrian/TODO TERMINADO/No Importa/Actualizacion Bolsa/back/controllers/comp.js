import path from 'path';
import fs from 'fs';
import { EmpresaModel } from '../models/EmpresaModel.js';

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

            const filePath = path.join(__dirname, '..', 'upload', empresa.imagenPerfil);
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
            const imagenPerfil = req.file ? req.file.filename : null;

            if (!imagenPerfil) {
                return res.status(400).json({ message: 'No se proporcionó una imagen de perfil' });
            }

            // Obtener empresa existente para validar o eliminar archivos
            const existingEmpresa = await EmpresaModel.getEmpresaById(empresaId);

            if (!existingEmpresa) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }

            // Si hay una nueva imagen, eliminar la antigua
            if (existingEmpresa.imagenPerfil) {
                const oldImagePath = path.join(__dirname, '..', 'upload', existingEmpresa.imagenPerfil);
                try {
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                } catch (error) {
                    console.error('Error al eliminar la imagen antigua:', error);
                }
            }

            const empresa = await EmpresaModel.updateEmpresaProfilePicture(empresaId, imagenPerfil);

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