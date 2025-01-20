import { loadFilesByExtension } from './utils/fileUtils.js';
import { optimizeProfile } from './utils/promptUtils.js';
import fs from 'fs';
import path from 'path';

const profilesDirectoryPath = path.join(__dirname, 'profiles');
const optimizedProfilesDirectoryPath = path.join(__dirname, 'optimized_profiles');

async function processProfiles() {
    const profileFiles = loadFilesByExtension(profilesDirectoryPath, '.json');
    const profiles = profileFiles.map(file => {
        const filePath = path.join(profilesDirectoryPath, file);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    });

    for (const profile of profiles) {
        const optimizedProfile = await optimizeProfile(profile);

        const optimizedFilePath = path.join(optimizedProfilesDirectoryPath, `${profile["Nombres y Apellidos"]}_optimized.json`);
        fs.writeFileSync(optimizedFilePath, JSON.stringify(optimizedProfile, null, 2));
    }
}

export { processProfiles };