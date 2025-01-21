// models/tempIA.js
import mongoose from 'mongoose';

const tempIASchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  portfolio: { type: String, required: true },
  professionalProfile: { type: String, required: true },
  technicalSkills: { type: [String], required: true },
  softSkills: { type: [String], required: true },
  experiences: { type: [Object], required: true },
  educations: { type: [Object], required: true },
  projects: { type: [Object], required: true },
  references: { type: [Object], required: true },
});

const TempProfile = mongoose.model('tempIAprofile', tempIASchema);

export { TempProfile };