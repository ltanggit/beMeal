import express from 'express';
// import StreakWindow, { generateStreakWindow } from './streakWindow.js';
import { generateStreakWindow } from '../Windows/generateStreakWindow.js';
import { getStreakWindow } from '../Windows/getStreakWindow.js';

const router = express.Router();

// StreakWindow routes
router.post("/generateStreakWindow", generateStreakWindow);
router.get("/getStreakWindow", getStreakWindow);

export default router;