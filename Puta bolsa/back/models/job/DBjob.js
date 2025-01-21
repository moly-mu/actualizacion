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
    type: String, // Mantén el tipo como String si estás usando fechas como texto
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Vacancies: {
    type: String, // Cambié a String para que acepte valores como "1 vacante" o "18 vacantes"
    required: true,
  },
  Keyword: {
    type: [String],
    required: true,
  },
  Salary: {
    type: String, // Mantén Salary como String para valores como "COP $1,300,000"
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
