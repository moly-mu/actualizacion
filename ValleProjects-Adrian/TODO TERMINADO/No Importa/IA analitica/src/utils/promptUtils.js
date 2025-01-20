const fetch = require('node-fetch');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const aiJson = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function queryOpenAI(prompt) {
    try {
        const completion = await aiJson.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `
                    Tu función va a ser: Comparar el CV de un usuario con trabajos y de esa manera ver cuál es el más compatible.
                1 - Vas a revisar las fortalezas y debilidades (si las hay) del CV del usuario.
                2 - Analizar el apartado de experiencia en el CV del usuario con los requisitos que solicita el trabajo.
                3 - Si crees factible, ver el apartado de "Sobre mí" del CV del usuario y ver qué puedes comparar.
                4 - Si crees factible, ver el apartado de educación del CV del usuario y ver qué puedes comparar.
                5 - Si crees factible, ver el apartado de áreas de conocimiento del CV del usuario y ver qué puedes comparar.
                    `,
                },
                { role: 'user', content: prompt },
            ],
        });

        // Procesar la respuesta
        let responseContent = completion.choices[0].message.content;
        
        // Intentar extraer JSON de la respuesta
        let responseJson = null;
        const jsonStart = responseContent.indexOf('{');
        const jsonEnd = responseContent.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
            try {
                responseJson = JSON.parse(responseContent.substring(jsonStart, jsonEnd + 1));
            } catch (e) {
                console.error("Error al intentar parsear JSON: ", e.message);
            }
        }

        // Validar si la respuesta es un JSON válido
        if (responseJson) {
            return responseJson;
        } else {
            return {
                text: responseContent,
                error: "La respuesta de OpenAI no es un JSON válido"
            };
        }
    } catch (error) {
        console.error('Error en la API de OpenAI:', error.message);
        throw new Error('Hubo un problema al obtener la respuesta de la IA. Revisa tu conexión a internet o las configuraciones de tu API.');
    }
}

module.exports = { queryOpenAI };