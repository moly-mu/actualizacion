import { readProfileFromDB } from './fileUtils.js';
import { api_ia } from './openai.js';

async function optimizeProfile(tempProfileId) {
  const tempProfile = await readProfileFromDB(tempProfileId);
  const action = JSON.stringify(tempProfile); // Convertir el perfil a JSON string

  const optimizedProfile = await api_ia(action);

  return JSON.parse(optimizedProfile);
}

export { optimizeProfile };