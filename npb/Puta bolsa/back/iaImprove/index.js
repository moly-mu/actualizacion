import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { iaImproveController } from './controller/iaImproveController.js';
import { verifyUser } from '../middleware/user/authuser.js'; 

dotenv.config();

const router = express.Router();

router.use(express.json());
router.use(cors());

router.post('/optimizar-cv', verifyUser, iaImproveController.optimizarCV);

export { router as iaImproveRoutes };