const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// Función para convertir PDFs a texto
async function convertPDFToText(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
}

// Función principal para procesar archivos PDF en la carpeta
async function processPDFs() {
    const directoryPath = __dirname;

    // Buscar archivos PDF en el directorio
    const pdfFiles = fs.readdirSync(directoryPath).filter(file => path.extname(file).toLowerCase() === '.pdf');

    if (pdfFiles.length === 0) {
        console.log("No se encontraron archivos PDF en la carpeta.");
        return;
    }

    console.log("Iniciando conversión de archivos PDF a TXT...");

    for (const pdfFile of pdfFiles) {
        try {
            const pdfPath = path.join(directoryPath, pdfFile);
            const text = await convertPDFToText(pdfPath);

            // Guardar texto en archivo TXT
            const txtPath = pdfPath.replace('.pdf', '.txt');
            fs.writeFileSync(txtPath, text);
            console.log(`Convertido: ${pdfFile} -> ${txtPath}`);

            // Eliminar el archivo PDF después de la conversión
            fs.unlinkSync(pdfPath);
            console.log(`Eliminado: ${pdfFile}`);
        } catch (error) {
            console.error(`Error al procesar ${pdfFile}:`, error.message);
        }
    }

    console.log("Conversión completa.");
}

// Ejecutar la función principal
processPDFs();