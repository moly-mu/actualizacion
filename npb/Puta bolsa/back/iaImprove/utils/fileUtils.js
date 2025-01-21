import { TempProfile } from '../../models/ia/tempIA.js';

async function saveProfileToDB(profileData) {
  const tempProfile = new TempProfile(profileData);
  await tempProfile.save();
  return tempProfile._id; // Devuelve el ID del documento guardado
}

async function readProfileFromDB(tempProfileId) {
  const tempProfile = await TempProfile.findById(tempProfileId);
  if (!tempProfile) {
    throw new Error('Perfil temporal no encontrado');
  }
  return tempProfile;
}

export { saveProfileToDB, readProfileFromDB };