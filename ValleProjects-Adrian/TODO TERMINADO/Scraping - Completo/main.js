const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');
const mongoose = require('mongoose'); 
const scrapeElempleo = require('./scrapers/elempleo');
const scrapeHoyTrabajas = require('./scrapers/hoytrabajas');
const scrapeColombiaTrabajos = require('./scrapers/colombiatrabajos');
const { conectarDB, insertarVacantesDesdeJSON, obtenerVacantes, eliminarOfertasExpiradas } = require('./db');

const scrapeAll = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const scrapers = [
        scrapeElempleo,
        scrapeHoyTrabajas,
        scrapeColombiaTrabajos
    ];

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(scrapers.length, 0);

    for (let i = 0; i < scrapers.length; i++) {
        try {
            const scraper = scrapers[i];
            const results = await scraper(browser);
            const timestamp = new Date().toISOString().split('T')[0];
            const filePath = path.join(__dirname, 'registro', `${scraper.name}_${timestamp}.json`);

            if (!fs.existsSync(path.join(__dirname, 'registro'))) {
                fs.mkdirSync(path.join(__dirname, 'registro'));
            }

            fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
            await insertarVacantesDesdeJSON(filePath);
            progressBar.update(i + 1);
        } catch (error) {
            console.error(`Error al ejecutar el scraper: ${error}`);
        }
    }

    progressBar.stop();
    await browser.close();

    try {
        const totalVacantes = await obtenerVacantes();
        console.log(`${totalVacantes} vacantes encontradas en la base de datos.`);
    } catch (error) {
        console.error(`Error al obtener vacantes: ${error}`);
    }

    try {
        await eliminarOfertasExpiradas();
    } catch (error) {
        console.error(`Error al eliminar ofertas expiradas: ${error}`);
    }

    mongoose.connection.close(); // Cerrar la conexión a MongoDB cuando todas las tareas terminen
    console.log('Conexión a MongoDB cerrada.');
    process.exit(0); // Finalizar el proceso de Node.js
};

conectarDB().then(async () => {
    await scrapeAll();
}).catch(console.error);