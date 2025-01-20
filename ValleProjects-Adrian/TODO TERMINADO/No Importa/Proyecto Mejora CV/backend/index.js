import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimizeProfile } from './utils/promptUtils.js';
import { generatePDF } from './utils/pdfUtils.js';
import { generateUniqueFileName } from './utils/fileUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, '../frontend')));

// Verificar si la carpeta profiles existe, si no, crearla
const profilesDir = path.join(__dirname, 'profiles');
if (!fs.existsSync(profilesDir)) {
    fs.mkdirSync(profilesDir);
}

app.post('/optimizar-cv', async (req, res) => {
    try {
        const { cvData } = req.body;

        // Log de los datos recibidos
        console.log('Datos recibidos del frontend:', JSON.stringify(cvData, null, 2));

        const fileName = generateUniqueFileName('profile'); // Generar un nombre único para el archivo
        const filePath = path.join(__dirname, 'profiles', fileName);

        // Guardar el CV como archivo .json
        console.log('Guardando el CV en:', filePath);
        fs.writeFileSync(filePath, JSON.stringify(cvData, null, 2)); 
        
        // Optimizar el perfil utilizando el contenido del archivo .json
        const optimizedProfile = await optimizeProfile(fileName.replace('.txt', ''));
        console.log('Perfil optimizado:', optimizedProfile);

        // Generar PDF con el perfil optimizado
        const pdfBuffer = await generatePDF(optimizedProfile);

        res.setHeader('Content-Disposition', 'attachment; filename=optimized_cv.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error al optimizar el perfil:", error);
        res.status(500).send("Hubo un problema al optimizar el CV.");
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});