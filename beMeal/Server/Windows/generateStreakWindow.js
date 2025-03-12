import StreakWindow from "./streakWindowSchema.js";

// Function to generate and store a new streak window
export const generateStreakWindow = async (req, res) => {
    try {
        // Pick a random hour between 0-21 (to ensure a full 2-hour window fits)
        const randomHour = Math.floor(Math.random() * 22);
        const startTime = new Date();
        startTime.setHours(randomHour, 0, 0, 0);

        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + 2);

        // Store in the database (replace old one if it exists)
        await StreakWindow.deleteMany({}); // Keep only one active window at a time
        await StreakWindow.create({ startTime, endTime });

        console.log(`New streak window: ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`);
        res.status(200).json({ message: 'New streak window generated' });

    } catch (error) {
        console.error('Error generating streak window:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};