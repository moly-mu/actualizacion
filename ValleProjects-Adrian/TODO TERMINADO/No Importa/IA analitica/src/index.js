require('dotenv').config();
const { processJobsAndCVs } = require('./processJobs');

// Ejecutar análisis
processJobsAndCVs().catch(err => console.error(err));