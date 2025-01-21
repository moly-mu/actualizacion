import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para obtener todos los trabajos
const getAllJobs = async () => {
    return await prisma.job.findMany();
};

// Función para obtener un trabajo por su ID
const getJobById = async (jobId) => {
    return await prisma.job.findUnique({
        where: { id: parseInt(jobId) },
    });
};

// Función para verificar si el usuario ya aplicó a un trabajo
const checkExistingApplication = async (jobId, userId) => {
    return await prisma.solicitud.findFirst({
        where: {
            jobId: parseInt(jobId),
            userId: parseInt(userId),
        },
    });
};

// Función para crear una nueva solicitud de trabajo con hoja de vida y estado
const createApplication = async (jobId, userId, hojaDeVidaPath, status = 'pendiente') => {
    return await prisma.solicitud.create({
        data: {
            jobId: parseInt(jobId),
            userId: parseInt(userId),
            hojaDeVida: hojaDeVidaPath || null,  // Se guarda la ruta de la hoja de vida si existe
            status: status,  // Estado de la solicitud, por defecto es 'pendiente'
        },
    });
};

// Función para crear un nuevo trabajo
const createJob = async (data) => {
    return await prisma.job.create({
        data: {
            title: data.title,
            description: data.description,
            company: data.company,
            location: data.location,
            salary: data.salary,
            empresaId: data.empresaId,
        },
    });
};

// Función para actualizar un trabajo 
const updateJob = async (jobId, data) => { 
    return await prisma.job.update({ 
        where: { id: parseInt(jobId) }, 
        data: { 
            title: data.title, 
            description: data.description, 
            company: data.company, 
            location: data.location, 
            salary: data.salary, 
        }, 
    }); 
};

// Función para eliminar un trabajo y sus dependencias 
const deleteJob = async (jobId) => { 
    await prisma.solicitud.deleteMany({ 
        where: { jobId: parseInt(jobId) }, 
    }); 
    
    // Ahora eliminar el trabajo 
    return await prisma.job.delete({ 
        where: { id: parseInt(jobId) }, 
    });
};

// Función para obtener las solicitudes de un trabajo
const getApplicationsForJob = async (jobId) => {
    return await prisma.solicitud.findMany({
        where: {
            jobId: parseInt(jobId), 
        },
        include: {
            user: {
                select: {
                    id: true,
                    correoElectronico: true,
                    primerNombre: true,
                    primerApellido: true,
                },
            },
        },
    });
};

// Función para actualizar el estado de una solicitud
const updateApplicationStatus = async (applicationId, status) => {
    return await prisma.solicitud.update({
        where: { id: parseInt(applicationId) },
        data: { status },
    });
};

// Función para obtener todas las solicitudes de un usuario
const getUserApplications = async (userId) => {
    return await prisma.solicitud.findMany({
        where: {
            userId: parseInt(userId),
        },
        include: {
            job: true,
        },
    });
};


const getJobsByEmpresa = async (empresaId) => {
    return await prisma.job.findMany({
        where: {
            empresaId: empresaId,
        },
    });
};

export const jobModel = {
    getAllJobs,
    getJobById,
    checkExistingApplication,
    createApplication,
    createJob,
    updateJob,
    updateApplicationStatus,
    deleteJob,
    getApplicationsForJob,
    getUserApplications,
    getJobsByEmpresa,
};