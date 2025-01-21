import { Job } from '../models/job/DBjob.js';

const DBjobController = { 
  getAllJobs: async (req, res) => {
    try {
      // Usar .select() para especificar los campos que deseas que sean retornados
      const jobs = await Job.find().select('Title Description ClosingDate Location Vacancies Keyword Salary job_board Link'); // Asegúrate de incluir todos los campos
      res.status(200).json(jobs);
    } catch (error) {
      console.error('Error al obtener los trabajos desde la base de datos:', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  },
};

export { DBjobController };
