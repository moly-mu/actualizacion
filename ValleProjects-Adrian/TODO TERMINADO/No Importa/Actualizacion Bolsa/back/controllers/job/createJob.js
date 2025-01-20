import { jobModel } from '../../models/jobModel.js';

const createJob = async (req, res) => {
    const { title, description, company, location, salary } = req.body;
    const empresaId = req.user.id; // Asumiendo que el ID de la empresa está en req.user.id

    if (!title || !description || !company || !location) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const newJob = await jobModel.createJob({
            title,
            description,
            company,
            location,
            salary,
            empresaId, // Pasar empresaId al modelo
        });

        return res.status(201).json({ message: 'Trabajo creado exitosamente', job: newJob });
    } catch (error) {
        console.error('Error al crear el trabajo:', error);
        return res.status(500).json({ message: 'Error al crear el trabajo.' });
    }
};

export { createJob };