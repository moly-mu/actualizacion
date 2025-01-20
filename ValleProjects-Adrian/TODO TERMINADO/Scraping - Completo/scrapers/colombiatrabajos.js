const getModeloJson = require('../modelojson');

const scrapeColombiaTrabajos = async (browser) => {
    const page = await browser.newPage();
    await page.goto('https://colombia.trabajos.com/bolsa-empleo/?IDPAIS=40&CADENA=&SUBMIT=Buscar+empleo');
    await page.waitForSelector('div.buscador2014');

    let urls = await page.$$eval('a.oferta.j4m_link', (links) => {
        return links.map((el) => el.href);
    });

    let pagePromise = (link) =>
        new Promise(async (resolve, reject) => {
            let dataObj = getModeloJson();
            let newPage = await browser.newPage();
            await newPage.goto(link, { waitUntil: 'load', timeout: 0 });

            try {
                dataObj["Title"] = await newPage.$eval(
                    'h2.nombre',
                    (text) => text.innerText.trim()
                );
            } catch (error) {}

            try {
                dataObj["Description"] = await newPage.$$eval(
                    'div.subtitulo',
                    (paragraphs) => paragraphs.map(p => p.innerText.trim()).join(' ')
                );
            } catch (error) {}

            try {
                dataObj["Vacancies"] = await newPage.$eval(
                    'a#RESPONDEROFERTA3.vacantes',
                    (text) => text.innerText.trim()
                );
            } catch (error) {}

            try {
                dataObj["Salary"] = await newPage.$eval(
                    'strong',
                    (text) => {
                        const salaryText = text.innerText.trim();
                        if (salaryText.toLowerCase().includes("gratis") || salaryText.toLowerCase().includes("a convenir")) {
                            return "A convenir";
                        } else {
                            return salaryText;
                        }
                    }
                );
            } catch (error) {}

            dataObj["ClosingDate"] = dataObj["ClosingDate"];
            dataObj["job_board"] = 'colombia.trabajos';
            dataObj["Link"] = link;

            resolve(dataObj);
            await newPage.close();
        });

    let results = [];
    for (let link of urls) {
        let currentPageData = await pagePromise(link);
        results.push(currentPageData);
    }

    await page.close();
    return results;
};

scrapeColombiaTrabajos.name = 'colombia.trabajos';
module.exports = scrapeColombiaTrabajos;