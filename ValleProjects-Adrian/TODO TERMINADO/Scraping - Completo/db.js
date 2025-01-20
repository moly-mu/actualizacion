const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

// URI de conexión tomada del archivo .env
const dbURI = process.env.MONGO_URI;

// Definir el esquema para la colección `vacantes`
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

// Función para conectar a la base de datos MongoDB
async function conectarDB() {
    try {
        await mongoose.connect(dbURI);
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
    }
}

// Función para insertar vacantes desde un archivo JSON
async function insertarVacantesDesdeJSON(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    try {
        const resultados = await Data.insertMany(data);
        console.log(`${resultados.length} trabajos guardados en la base de datos desde el archivo ${filePath}`);
    } catch (error) {
        console.error(`Error al insertar datos del archivo ${filePath}:`, error);
    }
}

// Función para obtener todos los documentos de la colección `vacantes`
async function obtenerVacantes() {
    try {
        const vacantes = await Data.find();
        return vacantes.length;
    } catch (error) {
        console.error('Error al obtener vacantes:', error);
        return 0;
    }
}

// Función para eliminar ofertas expiradas
const { MongoClient } = require('mongodb');
const moment = require('moment');

function parsearFecha(fecha) {
  const regexFechaTexto = /^Vence (\d{1,2}) ([A-Za-záéíóúÁÉÍÓÚ]+) (\d{4})$/;
  const match = fecha.match(regexFechaTexto);
  if (match) {
    const [_, dia, mes, anio] = match;
    moment.locale('es');
    const fechaParseada = moment(`${dia} ${mes} ${anio}`, 'D MMM YYYY');
    return fechaParseada.isValid() ? fechaParseada.toDate() : null;
  }
  const fechaParseada = moment(fecha, 'DD/MM/YYYY');
  return fechaParseada.isValid() ? fechaParseada.toDate() : null;
}

async function eliminarOfertasExpiradas() {
  const url = process.env.MONGO_URI;
  const dbName = 'basemongo';
  const collectionName = 'vacantes';
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const fechaActual = moment().startOf('day').toDate();
    const ofertas = await collection.find({ "ClosingDate": { $exists: true } }).toArray();

    const ofertasExpiradas = ofertas.filter(oferta => {
      const fechaClosing = parsearFecha(oferta.ClosingDate);
      return fechaClosing && fechaClosing < fechaActual;
    });

    if (ofertasExpiradas.length > 0) {
      const idsExpirados = ofertasExpiradas.map(oferta => oferta._id);
      const result = await collection.deleteMany({ _id: { $in: idsExpirados } });
      console.log(`${result.deletedCount} ofertas laborales expiradas eliminadas.`);
    }
  } catch (error) {
    console.error('Error al conectar o eliminar ofertas', error);
  } finally {
    await client.close();
  }
}

module.exports = {
    conectarDB,
    insertarVacantesDesdeJSON,
    obtenerVacantes,
    eliminarOfertasExpiradas
};