import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const EmpresaModel = {
    getEmpresaById: async (id) => {
        try {
            const empresa = await prisma.empresa.findUnique({
                where: { id: id },
            });
            return empresa;
        } catch (error) {
            console.error('Error al obtener la empresa por ID:', error);
            throw error;
        }
    },

    updateEmpresaProfile: async (id, data) => {
        try {
            const empresa = await prisma.empresa.update({
                where: { id: id },
                data: data,
            });
            return empresa;
        } catch (error) {
            console.error('Error al actualizar el perfil de la empresa:', error);
            throw error;
        }
    },

    updateEmpresaProfilePicture: async (id, imagenPerfil) => {
        try {
            const empresa = await prisma.empresa.update({
                where: { id: id },
                data: { imagenPerfil: imagenPerfil },
            });
            return empresa;
        } catch (error) {
            console.error('Error al actualizar la imagen de perfil de la empresa:', error);
            throw error;
        }
    },
};

export{ EmpresaModel };