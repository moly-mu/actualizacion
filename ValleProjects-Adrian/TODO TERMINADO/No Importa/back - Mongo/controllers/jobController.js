import { getAllJobs } from './job/getAllJobs.js';
import { getJobById } from './job/getJobById.js';
import { createJob } from './job/createJob.js';
import { updateJob } from './job/updateJob.js';
import { deleteJob } from './job/deleteJob.js';
import { applyToJob } from './job/applyToJob.js';
import { getApplicationsForJob } from './job/getApplicationsForJob.js';
import { updateApplicationStatus } from './job/updateApplicationStatus.js';
import { getUserApplications } from './job/getUserApplications.js';
import { getJobsByEmpresa } from './job/getJobsByEmpresa.js';

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
    getJobsByEmpresa,
};

export { jobController };