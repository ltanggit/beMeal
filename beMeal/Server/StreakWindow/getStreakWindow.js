import StreakWindow from "./streakWindowSchema.js";

export const getStreakWindow = async (req, res) => {
    try {
        const streakWindow = await StreakWindow.findOne();
        if (!streakWindow) {
            return res.status(404).json({ error: 'No active streak window found' });
        }
        res.status(200).json({ startTime: streakWindow.startTime.toLocaleTimeString(), endTime: streakWindow.endTime.toLocaleTimeString() });
    } catch (error) {
        console.error('Error fetching streak window:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};