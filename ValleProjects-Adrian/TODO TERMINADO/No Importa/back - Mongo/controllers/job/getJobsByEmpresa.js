import { jobModel } from '../../models/jobModel.js';

const getJobsByEmpresa = async (req, res) => {
    const empresaId = req.user.id; // Asumiendo que el ID de la empresa está en req.user.id

    try {
        const jobs = await jobModel.getJobsByEmpresa(empresaId);

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: 'No se encontraron trabajos para esta empresa.' });
        }

        return res.status(200).json(jobs);
    } catch (error) {
        console.error('Error al obtener los trabajos de la empresa:', error);
        return res.status(500).json({ message: 'Error al obtener los trabajos de la empresa.' });
    }
};

export { getJobsByEmpresa };