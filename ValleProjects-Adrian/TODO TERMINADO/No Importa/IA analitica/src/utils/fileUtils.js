const fs = require('fs');
const path = require('path');

// Función para buscar archivos en un directorio específico
function loadFilesByExtension(directoryPath, extension) {
    const files = fs.readdirSync(directoryPath);
    return files.filter(file => path.extname(file).toLowerCase() === extension);
}

module.exports = { loadFilesByExtension };