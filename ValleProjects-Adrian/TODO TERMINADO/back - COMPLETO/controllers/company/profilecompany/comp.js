import { upEmpresa } from '../../../models/emp/upEmpresa.js';  
import { EmpresaModel } from '../../../models/emp/EmpresaModel.js';

const EmpresaController = {
    // Obtener perfil de la empresa
    getEmpresaProfile: async (req, res) => {
        try {
            const empresaId = req.user.id; 
            const empresa = await EmpresaModel.getEmpresaById(empresaId);

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }

            const { contrasena, ...empresaData } = empresa;
            return res.status(200).json(empresaData);
        } catch (error) {
            console.error('Error al obtener el perfil de la empresa:', error);
            res.status(500).json({ message: 'Error al obtener el perfil de la empresa' });
        }
    },

    // Obtener imagen de perfil de la empresa
    getEmpresaProfilePicture: async (req, res) => {
        try {
            const empresaId = req.user.id; 
            const empresa = await EmpresaModel.getEmpresaById(empresaId);

            if (!empresa || !empresa.imagenPerfil) {
                return res.status(404).json({ message: 'Imagen de perfil no encontrada' });
            }

            const archivo = await upEmpresa.findById(empresa.imagenPerfil);
            if (archivo) {
                res.set('Content-Type', archivo.tipo);
                res.send(archivo.datos);
            } else {
                res.status(404).json({ message: 'Archivo no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener la imagen de perfil:', error);
            res.status(500).json({ message: 'Error al obtener la imagen de perfil' });
        }
    },

    // Actualizar perfil de la empresa
    updateEmpresaProfile: async (req, res) => {
        try {
            const empresaId = req.user.id; 
            const { razonSocial, sector, telefono, nombreEmpresa, ubicacion, nit } = req.body;
        
            const empresa = await EmpresaModel.updateEmpresaProfile(empresaId, {
                razonSocial, sector, telefono, nombreEmpresa, ubicacion, nit,
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

    // Actualizar imagen de perfil de la empresa
    updateEmpresaProfilePicture: async (req, res) => {
        try {
            const empresaId = req.user.id; 
            
            // Verificar si hay un archivo en la solicitud
            if (!req.file) {
                return res.status(400).json({ message: 'No se proporcionó una imagen de perfil' });
            }

            const { originalname, mimetype, buffer } = req.file;

            const existingEmpresa = await EmpresaModel.getEmpresaById(empresaId);

            if (!existingEmpresa) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }

            // Eliminar la imagen antigua si existe
            if (existingEmpresa.imagenPerfil) {
                await upEmpresa.findByIdAndDelete(existingEmpresa.imagenPerfil);
            }

            // Guardar la nueva imagen en MongoDB
            const nuevoArchivo = new upEmpresa({
                nombre: originalname,
                tipo: mimetype,
                datos: buffer,
                empresaId: empresaId,
            });
            await nuevoArchivo.save();

            const empresa = await EmpresaModel.updateEmpresaProfilePicture(empresaId, nuevoArchivo._id);

            return res.status(200).json({ message: 'Imagen de perfil actualizada correctamente' });
        } catch (error) {
            console.error('Error al actualizar la imagen de perfil:', error);
            res.status(500).json({ message: 'Error al actualizar la imagen de perfil' });
        }
    },
};

export { EmpresaController };