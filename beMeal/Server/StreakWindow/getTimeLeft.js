import StreakWindow from "./streakWindowSchema.js";

export const getTimeLeft = async (req, res) => { 
    try {
        // Fetch the latest active streak window
        const streakWindow = await StreakWindow.findOne().sort({ createdAt: -1 }); // Sort in descending order of createdAt to get the latest streak window
        
        if (!streakWindow) {
            return res.status(404).json({ error: 'No active streak window found' });
        }

        const currentTime = new Date();

        if (currentTime < streakWindow.startTime) {
            return res.status(404).json({ message: "Streak window has not opened yet", timeLeft: 0 });
        }

        const timeLeft = streakWindow.endTime - currentTime;

        if (timeLeft <= 0) {
            return res.status(404).json({ message: "Streak window has closed", timeLeft: 0 });
        }

        const hoursLeft = Math.floor(timeLeft / 3600000); // Convert milliseconds to hours
        const minutesLeft = Math.floor((timeLeft % 3600000) / 60000); // Convert remaining milliseconds to minutes
        const secondsLeft = Math.floor((timeLeft % 60000) / 1000); // Convert the remaining milliseconds to seconds

        // Format time to HH:MM:SS
        const formattedTimeLeft = 
            `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

        res.status(200).json({ timeLeft: formattedTimeLeft });

        // res.status(200).json({ timeLeft: `${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds` });

    } catch (error) {
        console.error('Error fetching time left:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}