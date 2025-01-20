import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convierte import.meta.url a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para obtener las ofertas de trabajo desde un archivo JSON
const getJobsFromFile = (filePath, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        try {
            const jobs = JSON.parse(data);
            res.json(jobs);
        } catch (parseError) {
            console.error('Error al parsear el archivo JSON:', parseError);
            res.status(500).json({ error: 'Error al procesar los datos' });
        }
    });
};

// Función para obtener las ofertas de trabajo del archivo jobs1.json
const getJobs1 = (req, res) => {
    const filePath = path.join(__dirname, 'review', 'jobs1.json');  // Ajusta la ruta
    getJobsFromFile(filePath, res);
};

// Función para obtener las ofertas de trabajo del archivo jobs2.json
const getJobs2 = (req, res) => {
    const filePath = path.join(__dirname, 'review', 'jobs2.json');  // Ajusta la ruta
    getJobsFromFile(filePath, res);
};

// Función para obtener las ofertas de trabajo del archivo jobs3.json
const getJobs3 = (req, res) => {
    const filePath = path.join(__dirname, 'review', 'jobs3.json');  // Ajusta la ruta
    getJobsFromFile(filePath, res);
};

export { getJobs1, getJobs2, getJobs3 };