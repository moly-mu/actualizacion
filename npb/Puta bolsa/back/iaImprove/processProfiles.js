import { saveProfileToDB, readProfileFromDB } from './utils/fileUtils.js';
import { optimizeProfile } from './utils/promptUtils.js';

async function processProfiles(profiles) {
    for (const profile of profiles) {
        // Guarda el perfil temporal en la base de datos
        const tempProfileId = await saveProfileToDB(profile);

        // Optimizar el perfil utilizando el ID del perfil temporal
        const optimizedProfile = await optimizeProfile(tempProfileId);

        // Guardar el perfil optimizado en la base de datos (si es necesario)
        // O manejar el perfil optimizado según tus requerimientos

        // Opcional: eliminar el perfil temporal de la base de datos después de optimizarlo
        await TempProfile.findByIdAndDelete(tempProfileId);
    }
}

export { processProfiles };