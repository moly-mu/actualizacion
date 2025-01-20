const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    // Inicia el navegador
    const browser = await puppeteer.launch({ 
        headless: true,   // Modo no headless para ver el navegador (puedes cambiar a true después de las pruebas)
        args: ['--disable-images', '--disable-javascript'], // Deshabilitar imágenes y scripts innecesarios
        timeout: 60000     // Aumentar el tiempo de espera global a 60 segundos
    });
    
    const page = await browser.newPage();
    
    // Navega a la página de las ofertas de empleo
    await page.goto('https://hoytrabajas.com/ofertas-empleo-colombia/bogota?id=56893', {
        waitUntil: 'networkidle2',
        timeout: 60000 // Aumentar el tiempo de espera en cada navegación
    });

    // Esperar a que se cargue al menos un enlace de oferta de trabajo
    await page.waitForSelector('a.card.relative', { timeout: 60000 });

    // Extrae los enlaces de las ofertas de empleo
    const jobLinks = await page.evaluate(() => {
        const offerElements = Array.from(document.querySelectorAll('a.card.relative'));
        return offerElements.map(element => element.href);
    });

    // Array para almacenar los detalles de las ofertas de empleo
    const jobData = [];

    // Navegar a cada enlace y extraer información
    for (const link of jobLinks) {
        await page.goto(link, { waitUntil: 'networkidle2', timeout: 60000 });
        
        // Extraer información de cada oferta
        const jobDetails = await page.evaluate(() => {
            const titleElement = document.querySelector('h2.text-blue-700.text-2xl');
            const vacanciesElement = Array.from(document.querySelectorAll('span.text-grey-500'))
                .find(vacancy => vacancy.innerText.includes('Vacantes'));
            const closingDateElement = document.querySelector('span.text-sm.font-normal');
            const descriptionElement = document.querySelector('p.text-justify');  // Aquí ajustamos el selector para la descripción

            const title = titleElement ? titleElement.innerText.trim() : 'No especificado';
            const vacancies = vacanciesElement 
                ? vacanciesElement.innerText.trim().replace('Vacantes', '').trim()
                : 'No especificado';

            // Extraer solo la fecha, eliminando el texto "Fecha de cierre: "
            const closingDate = closingDateElement 
                ? closingDateElement.innerText.trim().replace('Fecha de cierre: ', '') 
                : 'No especificado';

            // Extraer la descripción del trabajo
            const description = descriptionElement ? descriptionElement.innerText.trim() : 'No especificada';

            return {
                title,
                vacancies,
                closingDate,
                description,  // Añadir la descripción al objeto
                link: window.location.href // Obtener la URL actual
            };
        });

        // Agregar los detalles al array
        jobData.push(jobDetails);

        // Imprimir el resultado en consola
        console.log(`Título: "${jobDetails.title}", Vacantes: "${jobDetails.vacancies}", Fecha de cierre: "${jobDetails.closingDate}", Descripción: "${jobDetails.description}", Enlace: "${jobDetails.link}"`);
    }

    // Cierra el navegador
    await browser.close();

    // Formatear la fecha y hora para el nombre del archivo
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${today.getHours().toString().padStart(2, '0')}-${today.getMinutes().toString().padStart(2, '0')}-${today.getSeconds().toString().padStart(2, '0')}`;

    // Crear la carpeta "Registro" si no existe
    const folderPath = path.join(__dirname, 'Registro');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    // Nombre del archivo con la fecha y hora actual
    const filePath = path.join(folderPath, `scrape_${formattedDate}_${formattedTime}.json`);

    // Escribir el archivo JSON en la carpeta "Registro"
    fs.writeFileSync(filePath, JSON.stringify(jobData, null, 2));

    console.log(`Archivo JSON creado: ${filePath}`);
})();