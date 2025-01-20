import { getAllJobs } from './controllers/getAllJobs.js';
import { getJobById } from './controllers/getJobById.js';
import { createJob } from './controllers/createJob.js';
import { updateJob } from './controllers/updateJob.js';
import { deleteJob } from './controllers/deleteJob.js';
import { applyToJob } from './controllers/applyToJob.js';
import { getApplicationsForJob } from './controllers/getApplicationsForJob.js';
import { updateApplicationStatus } from './controllers/updateApplicationStatus.js';
import { getUserApplications } from './controllers/getUserApplications.js';
import { getJobsByEmpresa } from './controllers/getJobsByEmpresa.js';

const jobController = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    applyToJob,
    getApplicationsForJob,
    updateApplicationStatus,
    getUserApplications,
    getJobsByEmpresa
};

export { jobController };