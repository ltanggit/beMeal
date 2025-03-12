import express from 'express';
import { generateStreakWindow } from '../StreakWindow/generateStreakWindow.js';
import { getStreakWindow } from '../StreakWindow/getStreakWindow.js';
import { getTimeLeft } from '../StreakWindow/getTimeLeft.js';

const router = express.Router();

// StreakWindow routes
router.post("/generateStreakWindow", generateStreakWindow);
router.get("/getStreakWindow", getStreakWindow);
router.get("/getTimeLeft", getTimeLeft);

export default router;