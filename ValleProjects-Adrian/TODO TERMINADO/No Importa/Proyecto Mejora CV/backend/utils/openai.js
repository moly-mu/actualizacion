import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';

const profilesDirectoryPath = path.join('../backend', 'profiles');

dotenv.config();

const aiJson = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function api_ia(action) {
    try {
        console.log('Enviando solicitud a OpenAI con el prompt:', action);
        const completion = await aiJson.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `
                    Tu tarea es mejorar perfiles de usuarios sin añadir información falsa o inventada.
                    Estas son las condiciones que debes seguir:
                    - Mejora la redacción para que suene más profesional y ademas trata de hacer que el texto sea mas largo con el fin de tener una mejor explicación.
                    - Haz que cada sección sea coherente con el resto del CV.
                    - Resalta las habilidades, logros y experiencias clave de manera que resalten ante un reclutador.
                    - No modifiques los campos de "fullName", "email", "phone", "portfolio", "company", "startDate", "endDate", "institution" y en "references: 'position'" ya que son proporcionados por el usuario y son campos que solo el usuario conoce.
                    - En los campos donde sale "position" y "degree" quiero que los modifiques para que se vean mas formales pero esa modificacion debe ser extremadamente pequeña ya que se considera un titulo.
                    - El tono debe ser formal y centrado en las habilidades profesionales y experiencia laboral del candidato.
                    - Si crees que la informacion ya esta bien complementada la puedes dejar como esta.
                    `,
                },
                { role: 'user', content: action },
            ],
        });

        // Procesar la respuesta
        let responseJson = completion.choices[0].message.content;
        console.log('Respuesta de OpenAI:', responseJson);

        // Intentar extraer JSON de la respuesta
        const jsonStart = responseJson.indexOf('{');
        const jsonEnd = responseJson.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
            responseJson = responseJson.substring(jsonStart, jsonEnd + 1);
        }

        // Asegurarse de que la respuesta es un JSON válido
        try {
            JSON.parse(responseJson);
        } catch (e) {
            console.error("Respuesta de OpenAI no es un JSON válido:", responseJson);
            throw new Error("La respuesta de OpenAI no es un JSON válido");
        }
        return responseJson;
    } catch (error) {
        console.error('Error en la API de OpenAI:', error.message);
        throw new Error('Hubo un problema al obtener la respuesta de la IA.');
    }
}