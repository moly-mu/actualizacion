import { jobModel } from '../../models/jobModel.js';

const updateApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedApplication = await jobModel.updateApplicationStatus(id, status);

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Solicitud no encontrada.' });
        }

        return res.status(200).json({ message: 'Estado actualizado correctamente', application: updatedApplication });
    } catch (error) {
        console.error('Error al actualizar el estado de la solicitud:', error);
        return res.status(500).json({ message: 'Error al actualizar el estado de la solicitud.' });
    }
};

export { updateApplicationStatus };