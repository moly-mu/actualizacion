import { jobModel } from '../../models/jobModel.js';
import { userModel } from '../../models/userModel.js';  

// Función para aplicar a un trabajo, usando la hoja de vida del usuario si está disponible
const applyToJob = async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id;  // El ID del usuario se obtiene desde el middleware

    try {
        // Verificar si el trabajo existe
        const job = await jobModel.getJobById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Trabajo no encontrado.' });
        }

        // Verificar si la solicitud ya fue hecha
        const existingApplication = await jobModel.checkExistingApplication(jobId, userId);

        if (existingApplication) {
            return res.status(400).json({ message: 'Ya has aplicado a este trabajo.' });
        }

        // Obtener la hoja de vida del usuario desde la base de datos
        const user = await userModel.getUserById(userId);  // Asegúrate de tener este método en tu modelo

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // La hoja de vida puede estar vacía o no registrada en la base de datos
        const hojaDeVidaPath = user.hojaDeVida || null;

        console.log('Ruta de la hoja de vida:', hojaDeVidaPath);

        // Crear una nueva solicitud con la hoja de vida (si existe o es null)
        const newApplication = await jobModel.createApplication(jobId, userId, hojaDeVidaPath);

        return res.status(201).json({ message: 'Aplicación enviada correctamente', application: newApplication });
    } catch (error) {
        console.error('Error al aplicar al trabajo:', error);
        return res.status(500).json({ message: 'Error al procesar la solicitud.' });
    }
};

export { applyToJob };
