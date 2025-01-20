import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateUniqueFileName(prefix) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    return `${prefix}_${timestamp}.txt`;
}

function readTxtFile(fileName) {
    const filePath = path.join(__dirname, '../profiles', `${fileName}.txt`);
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error al leer el archivo ${filePath}:`, error);
        throw error;
    }
}

export { generateUniqueFileName, readTxtFile };