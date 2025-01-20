const mongoose = require('mongoose');

// Definir el esquema para la colección `data.json`
const dataSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    ClosingDate: { type: String, required: true },
    Location: { type: String, required: true },
    Vacancies: { type: String, required: true },
    Keyword: [String],
    Salary: { type: String, required: true },
    job_board: { type: String, required: true },
    Link: { type: String, required: true },
}, { versionKey: false }); // Desactivar la propiedad __v

// Crear el modelo basado en el esquema
const Data = mongoose.model('Jobs', dataSchema); // 'vacantes' es el nombre de la colección

module.exports = Data;