const getModeloJson = require('../modelojson');

const scrapeElempleo = async (browser) => {
    const page = await browser.newPage();
    await page.goto('https://www.elempleo.com/co/ofertas-empleo/');
    await page.waitForSelector('a.text-ellipsis.js-offer-title');
    
    let urls = await page.$$eval('a.text-ellipsis.js-offer-title', (links) => {
        return links.map((el) => el.href);
    });

    let pagePromise = (link) =>
        new Promise(async (resolve, reject) => {
            let dataObj = getModeloJson();
            let newPage = await browser.newPage();
            await newPage.goto(link, { waitUntil: 'load', timeout: 0 });

            try {
                dataObj["Title"] = await newPage.$eval(
                    'h1.ee-mod.ee-offer-title.js-offer-title',
                    (text) => text.innerText.trim()
                );
            } catch (error) {}

            try {
                dataObj["Description"] = await newPage.$eval(
                    'div.description-block span',
                    (text) => text.innerText.replace(/\s+/g, ' ').trim()
                );
            } catch (error) {}

            try {
                const dateElements = await newPage.$$('span.js-publish-date');
                if (dateElements.length > 0) {
                    if (dateElements.length > 1) {
                        dataObj["ClosingDate"] = (
                            await dateElements[1].evaluate((el) => el.innerText)
                        ).trim();
                    }
                }
            } catch (error) {}

            try {
                dataObj["Location"] = await newPage.$eval(
                    'span.js-joboffer-city',
                    (text) => text.innerText.trim()
                );
            } catch (error) {}

            try {
                dataObj["Vacancies"] = await newPage.$eval(
                    'p.js-vacancy',
                    (text) => {
                        let vacancyText = text.innerText.trim();
                        let match = vacancyText.match(/\d+/);
                        return match ? match[0] : "Número de vacantes no disponible";
                    }
                );
            } catch (error) {}

            try {
                dataObj["Keyword"] = await newPage.$eval(
                    'span.js-position-area',
                    (text) => [text.innerText.trim()]
                );
            } catch (error) {}

            try {
                dataObj["Salary"] = await newPage.$eval(
                    'span.js-joboffer-salary',
                    (text) => text.innerText.trim()
                );
            } catch (error) {}

            dataObj["job_board"] = 'elempleo';
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

scrapeElempleo.name = 'elempleo';
module.exports = scrapeElempleo;