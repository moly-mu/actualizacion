import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';  // Importa fileURLToPath desde 'url'
import { optimizeProfile } from './utils/promptUtils.js';
import { generatePDF } from './utils/pdfUtils.js';
import { generateUniqueFileName } from './utils/fileUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.use(express.json());
router.use(cors());

// Convierte import.meta.url a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verificar si la carpeta profiles existe dentro de iaImprove, si no, crearla
const profilesDir = path.join(__dirname, 'profiles');
if (!fs.existsSync(profilesDir)) {
    fs.mkdirSync(profilesDir);
}

router.post('/optimizar-cv', async (req, res) => {
    try {
        const cvData = {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            portfolio: req.body.portfolio,
            professionalProfile: req.body.professionalProfile,
            technicalSkills: req.body.technicalSkills || [],
            softSkills: req.body.softSkills || [],
            experiences: req.body.experiences || [],
            educations: req.body.educations || [],
            projects: req.body.projects || [],
            references: req.body.references || []
        };

        const fileName = generateUniqueFileName('profile'); // Generar un nombre único para el archivo
        const filePath = path.join(profilesDir, `${fileName}.json`); // Generar la ruta completa del archivo

        // Guardar el CV como archivo .json
        fs.writeFileSync(filePath, JSON.stringify(cvData, null, 2));

        // Optimizar el perfil utilizando el contenido del archivo .json
        const optimizedProfile = await optimizeProfile(filePath); // Pasar la ruta completa del archivo

        // Combinar los datos originales con los datos optimizados
        const combinedProfile = {
            ...cvData,
            ...optimizedProfile
        };

        // Generar PDF con el perfil combinado
        const pdfBuffer = await generatePDF(combinedProfile);

        // Enviar el PDF generado como respuesta
        res.setHeader('Content-Disposition', 'attachment; filename=optimized_cv.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);

        // Eliminar el archivo JSON después de enviar el PDF
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo JSON:', err);
            }
        });

    } catch (error) {
        console.error("Error al optimizar el CV:", error.message);
        res.status(500).send("Hubo un problema al optimizar el CV.");
    }
});

export { router as iaImproveRoutes };