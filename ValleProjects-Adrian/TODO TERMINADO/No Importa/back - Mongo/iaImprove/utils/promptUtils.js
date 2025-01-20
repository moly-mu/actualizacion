import fs from 'fs';
import  { api_ia }  from './openai.js';

async function optimizeProfile(filePath) {
    const profileData = fs.readFileSync(filePath, 'utf8');
    const action = profileData; // Suponiendo que el perfil ya está en formato JSON

    const optimizedProfile = await api_ia(action);

    return JSON.parse(optimizedProfile);
}

export { optimizeProfile };