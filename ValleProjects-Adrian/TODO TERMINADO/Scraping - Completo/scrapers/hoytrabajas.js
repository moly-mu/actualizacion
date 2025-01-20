const getModeloJson = require('../modelojson');
const puppeteer = require('puppeteer');

const scrapeHoyTrabajas = async (browser) => {
    const page = await browser.newPage();
    await page.goto('https://hoytrabajas.com/ofertas-empleo-colombia/bogota?id=56893', {
        waitUntil: 'networkidle2',
        timeout: 60000
    });

    await page.waitForSelector('a.card.relative', { timeout: 60000 });

    const jobLinks = await page.evaluate(() => {
        const offerElements = Array.from(document.querySelectorAll('a.card.relative'));
        return offerElements.map(element => element.href);
    });

    const jobData = [];

    for (const link of jobLinks) {
        try {
            await page.goto(link, { waitUntil: 'networkidle2', timeout: 60000 });

            const jobDetails = await page.evaluate(() => {
                const dataObj = {
                    "Title": "Título no disponible",
                    "Description": "Descripción no disponible",
                    "ClosingDate": "Fecha de vencimiento no disponible",
                    "Location": "Ubicación no disponible",
                    "Vacancies": "Número de vacantes no disponible",
                    "Keyword": ["Palabra clave no disponible"],
                    "Salary": "Salario no disponible",
                    "job_board": "hoytrabajas",
                    "Link": window.location.href
                };

                const titleElement = document.querySelector('h2.text-blue-700.text-2xl');
                const vacanciesElement = Array.from(document.querySelectorAll('span.text-grey-500'))
                    .find(vacancy => vacancy.innerText.includes('Vacantes'));
                const closingDateElement = document.querySelector('span.text-sm.font-normal');
                const descriptionElement = document.querySelector('p.text-justify');
                const salaryElement = Array.from(document.querySelectorAll('span.text-grey-500'))
                    .find(salary => salary.innerText.includes('$') || salary.innerText.includes('Salario'));

                dataObj["Title"] = titleElement ? titleElement.innerText.trim() : dataObj["Title"];
                dataObj["Description"] = descriptionElement ? descriptionElement.innerText.trim() : dataObj["Description"];
                dataObj["ClosingDate"] = closingDateElement
                    ? closingDateElement.innerText.trim().replace('Fecha de cierre: ', '')
                    : dataObj["ClosingDate"];
                dataObj["Vacancies"] = vacanciesElement
                    ? vacanciesElement.innerText.trim().replace('Vacantes', '').trim()
                    : dataObj["Vacancies"];
                dataObj["Salary"] = salaryElement ? salaryElement.innerText.trim() : dataObj["Salary"];

                return dataObj;
            });

            jobData.push(jobDetails);
        } catch (error) {
            console.log("Error en la página de enlace: ", error);
        }
    }

    await page.close();
    return jobData;
};

scrapeHoyTrabajas.name = 'hoytrabajas';
module.exports = scrapeHoyTrabajas;