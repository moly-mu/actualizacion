import { jobModel } from '../../../models/job/jobModel.js';

const getJobById = async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await jobModel.getJobById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Trabajo no encontrado.' });
        }

        return res.status(200).json(job);
    } catch (error) {
        console.error('Error al obtener el trabajo:', error);
        return res.status(500).json({ message: 'Error al obtener el trabajo.' });
    }
};

export { getJobById };
