import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  ClosingDate: {
    type: Date,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Vacancies: {
    type: Number,
    required: true,
  },
  Keyword: {
    type: [String],
    required: true,
  },
  Salary: {
    type: Number,
    required: true,
  },
  job_board: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model('Jobs', jobSchema);

export { Job };