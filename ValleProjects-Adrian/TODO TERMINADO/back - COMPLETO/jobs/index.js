import { Job } from '../models/job/DBjob.js';  

const DBjobController = { 
  getAllJobs: async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error al obtener los trabajos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
},

};

export { DBjobController };