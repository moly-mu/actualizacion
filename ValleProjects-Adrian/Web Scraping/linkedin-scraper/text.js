const puppeteer = require('puppeteer');

async function scrapeLinkedInJob(url) {
    // Abrir navegador
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Ir a la URL del trabajo
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Extraer la información de la página
    const jobData = await page.evaluate(() => {
        const getText = (selector) => {
            const element = document.querySelector(selector);
            return element ? element.innerText.trim() : null;
        };

        return {
            title: getText('h1.top-card-layout__title'),
            postedTime: getText('.posted-time-ago__text'),
            companyName: getText('.top-card-layout__second-subline span.topcard__flavor'),
            applicationsCount: getText('.num-applicants__caption'),
            jobLocation: getText('.topcard__flavor--bullet'),
            jobDescription: getText('.description__text'),  // Selector de la descripción del trabajo
        };
    });

    // Cerrar el navegador
    await browser.close();
    
    return jobData;
}

// Ejecutar la función de scraping
const jobUrl = 'https://co.linkedin.com/jobs/view/recepcionista-at-la-riviera-s-a-s-4059905015?position=1&pageNum=0&refId=NNQh4iOLjDg0a8KkMK02eg%3D%3D&trackingId=jiQF0gc5v8naFeqN2vZ1tw%3D%3D';

scrapeLinkedInJob(jobUrl).then((data) => {
    console.log(data);
}).catch((error) => {
    console.error('Error:', error);
});
