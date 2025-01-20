const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const scraperObject = {
    url: "https://www.elempleo.com/co/ofertas-empleo/",
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);

        await page.setDefaultNavigationTimeout(0);
        await page.goto(this.url);
        await page.waitForSelector('a.text-ellipsis.js-offer-title', { timeout: 60000 });

        // Obtener todos los enlaces de ofertas
        let urls = await page.$$eval('a.text-ellipsis.js-offer-title', (links) => {
            return links.map((el) => el.href);
        });

        let pagePromise = (link) =>
            new Promise(async (resolve, reject) => {
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.goto(link, { waitUntil: 'load', timeout: 0 });

                try {
                    // Título de la oferta
                    dataObj["Title"] = await newPage.$eval(
                        'h1.ee-mod.ee-offer-title.js-offer-title',
                        (text) => text.innerText.trim()
                    );
                } catch {
                    dataObj["Title"] = "Título no disponible";
                }

                try {
                    // Descripción general - Limpieza de saltos de línea y espacios extra
                    dataObj["Description"] = await newPage.$eval(
                        'div.description-block span',
                        (text) => text.innerText.replace(/\s+/g, ' ').trim()
                    );
                } catch {
                    dataObj["Description"] = "Descripción no disponible";
                }

                try {
                    // Fechas de vencimiento
                    const dateElements = await newPage.$$('span.js-publish-date');
                    if (dateElements.length > 0) {
                        // Segunda fecha (si existe): vencimiento
                        if (dateElements.length > 1) {
                            dataObj["ClosingDate"] = (
                                await dateElements[1].evaluate((el) => el.innerText)
                            ).trim();
                        } else {
                            dataObj["ClosingDate"] = "Fecha de vencimiento no disponible";
                        }
                    } else {
                        dataObj["ClosingDate"] = "Fecha de vencimiento no disponible";
                    }
                } catch {
                    dataObj["ClosingDate"] = "Fecha de vencimiento no disponible";
                }

                // Obtener el lugar de trabajo
                try {
                    dataObj["Location"] = await newPage.$eval(
                        'span.js-joboffer-city',
                        (text) => text.innerText.trim()
                    );
                } catch {
                    dataObj["Location"] = "Ubicación no disponible";
                }

                // Obtener el número de candidatos
                try {
                    dataObj["Vacancies"] = await newPage.$eval(
                        'p.js-vacancy',
                        (text) => {
                            // Extraemos el texto y limpiamos para obtener solo el número de vacantes
                            let vacancyText = text.innerText.trim();
                            let match = vacancyText.match(/\d+/); // Buscar el número
                            return match ? match[0] : "Número de vacantes no disponible"; // Devolver el número de vacantes o un valor por defecto
                        }
                    );
                } catch {
                    dataObj["Vacancies"] = "Número de vacantes no disponible";
                }

                // Obtener la palabra clave del área de trabajo
                try {
                    dataObj["Keyword"] = await newPage.$eval(
                        'span.js-position-area',
                        (text) => text.innerText.trim()
                    );
                } catch {
                    dataObj["Keyword"] = "Palabra clave no disponible";
                }

                // Obtener el salario de la oferta
                try {
                    dataObj["Salary"] = await newPage.$eval(
                        'span.js-joboffer-salary',
                        (text) => text.innerText.trim()
                    );
                } catch {
                    dataObj["Salary"] = "Salario no disponible";
                }

                // Enlace de la oferta
                dataObj["Link"] = link;

                resolve(dataObj);
                await newPage.close();
            });

        let results = [];
        for (let link of urls) {
            let currentPageData = await pagePromise(link);
            console.log(currentPageData);
            results.push(currentPageData);
        }

        // Guardar los resultados en un archivo JSON
        const dir = path.join(__dirname, 'registro'); // Ruta a la carpeta "registro"

        // Asegurarse de que la carpeta "registro" exista
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        // Crear el archivo JSON con los resultados
        const filePath = path.join(dir, 'resultados.json');
        fs.writeFileSync(filePath, JSON.stringify(results, null, 2), 'utf-8');
        console.log(`Resultados guardados en ${filePath}`);
    }
};

// Inicializar el scraper
(async () => {
    const browser = await puppeteer.launch({ 
        headless: true, // Cambia a false si quieres ver el navegador
        args: ['--disable-images', '--disable-javascript'],
        timeout: 60000
    });

    await scraperObject.scraper(browser); // Llamamos a la función scraper del objeto
    await browser.close(); // Cerrar el navegador después de la ejecución
})();