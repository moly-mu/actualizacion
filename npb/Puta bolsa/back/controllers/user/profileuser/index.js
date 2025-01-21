import { updateProfilePicture } from './updateProfilePict.js';
import { updateProfileB } from './updateProfileBa.js';
import { updateProfileCV } from './updateProfilepdf.js';
import { getResume } from './getResume.js';
import { getUserProfile } from './getUserProfile.js';
import { getUserProfilePicture } from './getUserProfilePicture.js';

const UserController = {
  getUserProfile,
  getUserProfilePicture,
  getResume,
  updateProfilePicture,
  updateProfileB,
  updateProfileCV,
};

export { UserController };