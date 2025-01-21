import { jobModel } from '../../../models/job/jobModel.js';

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.getAllJobs();
        return res.status(200).json(jobs);
    } catch (error) {
        console.error('Error al obtener los trabajos:', error);
        return res.status(500).json({ message: 'Error al obtener los trabajos.' });
    }
};

export{ getAllJobs };
