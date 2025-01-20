// subirJsonMongo.mjs
import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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
const Data = mongoose.model('Jobs', dataSchema); // 'Jobs' es el nombre de la colección

// Función para conectar a la base de datos MongoDB
async function conectarDB() {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
    }
}

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
        console.log(`Proceso de inserción completado para el archivo ${filePath}.`);
    } catch (error) {
        console.error(`Error al insertar datos del archivo ${filePath}:`, error);
    }
}

// Función principal para conectar a la base de datos y subir todos los archivos JSON en el directorio actual
async function main() {
    await conectarDB();
    const jsonFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.json'));

    for (const file of jsonFiles) {
        const filePath = path.join(__dirname, file);
        await insertarVacantesDesdeJSON(filePath);
    }

    mongoose.connection.close(); // Cerrar la conexión a MongoDB cuando terminen las tareas
    console.log('Conexión a MongoDB cerrada.');
}

main().catch(console.error);