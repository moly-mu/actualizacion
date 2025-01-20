const mongoose = require('mongoose');

// Esquema para los trabajos
const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Esquema para las solicitudes
const ApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: { type: String, required: true }, // Ajustar según cómo manejes los usuarios
    createdAt: { type: Date, default: Date.now }
});

// Crear modelos a partir de los esquemas
const Job = mongoose.model('Job', JobSchema);
const Application = mongoose.model('Application', ApplicationSchema);

// Función para obtener todos los trabajos
const getAllJobs = async () => {
    return await Job.find();
};

// Función para obtener un trabajo por su ID
const getJobById = async (jobId) => {
    return await Job.findById(jobId);
};

// Función para verificar si el usuario ya aplicó a un trabajo
const checkExistingApplication = async (jobId, userId) => {
    return await Application.findOne({ jobId, userId });
};

// Función para crear una nueva solicitud de trabajo
const createApplication = async (jobId, userId) => {
    const newApplication = new Application({ jobId, userId });
    return await newApplication.save();
};

// Función para crear un nuevo trabajo
const createJob = async (data) => {
    const newJob = new Job(data);
    return await newJob.save();
};

// Función para obtener las solicitudes de un trabajo
const getApplicationsForJob = async (jobId) => {
    return await Application.find({ jobId }).populate('jobId', 'title');
};

module.exports = {
    getAllJobs,
    getJobById,
    checkExistingApplication,
    createApplication,
    createJob,
    getApplicationsForJob
};