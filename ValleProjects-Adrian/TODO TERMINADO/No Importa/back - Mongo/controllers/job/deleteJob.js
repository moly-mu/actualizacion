import { jobModel } from '../../models/jobModel.js';

const deleteJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        const deletedJob = await jobModel.deleteJob(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Trabajo no encontrado.' });
        }

        return res.status(200).json({ message: 'Trabajo eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el trabajo:', error);
        return res.status(500).json({ message: 'Error al eliminar el trabajo.' });
    }
};

export { deleteJob };
