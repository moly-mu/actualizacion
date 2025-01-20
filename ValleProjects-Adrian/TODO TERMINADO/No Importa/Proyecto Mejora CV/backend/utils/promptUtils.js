import { api_ia } from './openai.js';
import { readTxtFile } from './fileUtils.js';

async function optimizeProfile(fileName) {
    try {
        const fileContent = readTxtFile(fileName); // Leer el contenido del archivo .json
        console.log('Contenido del archivo leído:', fileContent);

        const prompt = `
        Dado el siguiente perfil de usuario, haz sugerencias para mejorar los campos de la información (por ejemplo, reformula las frases para hacerlo más profesional) sin añadir datos nuevos que no estén presentes en el perfil:
        ${fileContent}
        `;

        const response = await api_ia(prompt);
        console.log('Respuesta de la IA:', response);

        // Verificar si la respuesta es un JSON válido
        let optimizedProfile;
        try {
            optimizedProfile = JSON.parse(response);
        } catch (e) {
            console.error("Respuesta de la IA no es un JSON válido:", response);
            throw new Error("La respuesta de la IA no es un JSON válido");
        }
        
        return optimizedProfile; // Devuelve el perfil optimizado
    } catch (error) {
        console.error("Error al optimizar el perfil:", error);
        throw error; // Lanzar el error para ser manejado en otro lugar
    }
}

export { optimizeProfile };