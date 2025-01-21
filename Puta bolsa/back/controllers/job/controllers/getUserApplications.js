import { jobModel } from '../../../models/job/jobModel.js';

const getUserApplications = async (req, res) => {
    try {
        const userId = req.user.id;
        const applications = await jobModel.getUserApplications(userId);

        res.json(applications);
    } catch (error) {
        console.error('Error al obtener las aplicaciones del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las aplicaciones del usuario' });
    }
};

export { getUserApplications };