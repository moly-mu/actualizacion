const fs = require('fs');
const path = require('path');
const Data = require('../models/vacante');

// Función para insertar vacantes desde un archivo JSON
async function insertarVacantesDesdeJSON(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    try {
        for (const oferta of data) {
            // Verificar si la oferta ya existe en la base de datos
            const ofertaExistente = await Data.findOne({ Title: oferta.Title, Description: oferta.Description, Location: oferta.Location, ClosingDate: oferta.ClosingDate });

            if (!ofertaExistente) {
                // Si no existe, insertar la oferta en la base de datos
                await Data.create(oferta);
                console.log(`Oferta guardada: ${oferta.Title}`);
            } else {
                console.log(`Oferta duplicada encontrada: ${oferta.Title} - No se inserta.`);
            }
        }
        console.log('Proceso de inserción completado.');
    } catch (error) {
        console.error(`Error al insertar datos del archivo ${filePath}:`, error);
    }
}

// Función para obtener todos los documentos de la colección `vacantes`
async function obtenerVacantes() {
    try {
        const vacantes = await Data.find();
        console.log('Vacantes encontradas:', vacantes);
    } catch (error) {
        console.error('Error al obtener vacantes:', error);
    }
}

module.exports = {
    insertarVacantesDesdeJSON,
    obtenerVacantes
};