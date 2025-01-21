import { jobModel } from '../../../models/job/jobModel.js';

const updateJob = async (req, res) => {
    const { jobId } = req.params;
    const { title, description, company, location, salary } = req.body;

    try {
        const updatedJob = await jobModel.updateJob(jobId, { title, description, company, location, salary });

        if (!updatedJob) {
            return res.status(404).json({ message: 'Trabajo no encontrado.' });
        }

        return res.status(200).json({ message: 'Trabajo actualizado correctamente', job: updatedJob });
    } catch (error) {
        console.error('Error al actualizar el trabajo:', error);
        return res.status(500).json({ message: 'Error al actualizar el trabajo.' });
    }
};

export { updateJob };