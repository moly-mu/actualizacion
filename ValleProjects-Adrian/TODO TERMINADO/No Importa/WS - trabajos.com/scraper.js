const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Función para obtener la fecha de vencimiento 30 días después de hoy
function getClosingDate() {
    const today = new Date();
    const closingDate = new Date(today);
    closingDate.setDate(today.getDate() + 30);
    
    const day = String(closingDate.getDate()).padStart(2, '0');
    const month = String(closingDate.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = closingDate.getFullYear();

    return `${day}/${month}/${year}`;
}

const scraperObject = {
    url: "https://colombia.trabajos.com/bolsa-empleo/?IDPAIS=40&CADENA=&SUBMIT=Buscar+empleo",
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);

        await page.setDefaultNavigationTimeout(0);
        await page.goto(this.url);
        await page.waitForSelector('div.buscador2014', { timeout: 60000 });

        // Obtener todos los enlaces de ofertas
        let urls = await page.$$eval('a.oferta.j4m_link', (links) => {
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
                        'h2.nombre',
                        (text) => text.innerText.trim()
                    );
                } catch {
                    dataObj["Title"] = "Título no disponible";
                }

                try {
                    // Descripción de la oferta
                    dataObj["Description"] = await newPage.$eval(
                        'h2.nombre',
                        (text) => text.innerText.replace(/\s+/g, ' ').trim()
                    );
                } catch {
                    dataObj["Description"] = "Descripción no disponible";
                }

                try {
                    // Vacantes disponibles
                    dataObj["Vacancies"] = await newPage.$eval(
                        'a#RESPONDEROFERTA3.vacantes',
                        (text) => text.innerText.trim()
                    );
                } catch {
                    dataObj["Vacancies"] = "Número de vacantes no disponible";
                }

                try {
                    // Salario ofrecido
                    dataObj["Salary"] = await newPage.$eval(
                        'strong',
                        (text) => {
                            const salaryText = text.innerText.trim();
                            // Verificar si el texto contiene "GRATIS" o "A convenir" y asignar un valor apropiado
                            if (salaryText.toLowerCase().includes("gratis") || salaryText.toLowerCase().includes("a convenir")) {
                                return "A convenir";
                            } else {
                                return salaryText;
                            }
                        }
                    );
                } catch {
                    dataObj["Salary"] = "Salario no disponible";
                }

                // Fecha de vencimiento
                dataObj["ClosingDate"] = getClosingDate();

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