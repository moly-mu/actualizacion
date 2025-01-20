const fs = require('fs');
const path = require('path');
const { loadFilesByExtension } = require('./utils/fileUtils');
const { queryOpenAI } = require('./utils/promptUtils');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms)); // Función para esperar

const RATE_LIMIT_DELAY = 2000; // Tiempo de espera entre solicitudes (en milisegundos)

const cvsDirectoryPath = path.join(__dirname, 'cv'); // Carpeta para los currículums
const jobsDirectoryPath = path.join(__dirname, 'jobs'); // Carpeta para las ofertas de trabajo
const resultsFilePath = path.join(__dirname, 'results.json'); // Archivo donde guardar los resultados

async function processJobsAndCVs() {
    const jobFiles = loadFilesByExtension(jobsDirectoryPath, '.json');
    const jobs = jobFiles.flatMap(file => {
        const filePath = path.join(jobsDirectoryPath, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return Array.isArray(content) ? content : [content];
    });

    const cvFiles = loadFilesByExtension(cvsDirectoryPath, '.txt');
    const cvs = cvFiles.map(file => {
        const filePath = path.join(cvsDirectoryPath, file);
        return {
            filename: file,
            content: fs.readFileSync(filePath, 'utf8')
        };
    });

    const finalResults = [];

    for (const cv of cvs) {
        console.log(`\nEvaluando CV: ${cv.filename}\n`);

        let analyzedJobsCount = 0;
        let relevantJobsCount = 0;

        for (const job of jobs) {
            analyzedJobsCount++;

            const prompt = `
                CV: ${cv.content}
                Trabajo: ${job.Title}, ${job.Description}, Palabras clave: ${job.Keyword || ''}, Ubicación: ${job.Location}, Fecha de cierre: ${job.ClosingDate}
                ¿Es relevante este trabajo para el CV? Responde con "Sí" o "No" y explica brevemente tu razonamiento.
            `;

            // Intentar realizar la consulta
            try {
                const response = await queryOpenAI(prompt);

                let isRelevant = false;
                let reasoning = "";

                if (response && typeof response === 'string') {
                    isRelevant = response.includes("Sí");
                    reasoning = response;
                } else if (response && typeof response === 'object' && response.text) {
                    isRelevant = response.text.includes("Sí");
                    reasoning = response.text;
                }

                console.log(`Trabajo: ${job.Title} - Relevancia: ${isRelevant ? "Sí" : "No"}`);
                console.log(`Razonamiento: ${reasoning}\n`);

                if (isRelevant) {
                    relevantJobsCount++;
                    finalResults.push({
                        cv: cv.filename,
                        job: {
                            title: job.Title,
                            description: job.Description,
                            location: job.Location,
                            closingDate: job.ClosingDate,
                            link: job.Link
                        },
                        relevance: "Sí",
                        reasoning: reasoning
                    });
                }

            } catch (error) {
                console.error(`Error en la API de OpenAI al procesar el trabajo "${job.Title}": ${error.message}`);
            }

            // Esperar para evitar límites de tasa
            await delay(RATE_LIMIT_DELAY);
        }

        console.log(`\nResumen para el CV: ${cv.filename}`);
        console.log(`Trabajos analizados: ${analyzedJobsCount}`);
        console.log(`Trabajos relevantes (Relevancia "Sí"): ${relevantJobsCount}\n`);
    }

    fs.writeFileSync(resultsFilePath, JSON.stringify(finalResults, null, 2));
    console.log(`\nResultados relevantes guardados en: ${resultsFilePath}`);
}

module.exports = { processJobsAndCVs };