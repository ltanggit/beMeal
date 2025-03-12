import User from './userSchema.js'; // Import the User schema
import StreakWindow from '../StreakWindow/streakWindowSchema.js';

// Function to update a user's streak
export const updateStreak = async (req, res) => {
    try {
        // Grab user ID from request body
        const { userID } = req.body;

        if (!userID) {
            return res.status(400).json({ error: 'Must supply a userID' });
        }

        // Find the user
        const user = await User.findOne({ userID });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const now = new Date(); // Current time in UTC

        // Get the latest streak window
        const streakWindow = await StreakWindow.findOne().sort({ createdAt: -1 });
        if (!streakWindow) {
            return res.status(404).json({ error: 'No active streak window found' });
        }

        const { startTime, endTime } = streakWindow;
        console.log(`Current Time: ${now}`);
        console.log(`Streak Window: ${startTime} - ${endTime}`);
        console.log(`User Last Post Date: ${user.lastPostDate}`);

        let newStreakCount = user.streakCount; // Start with current streak

        // Check if the current time is within the active streak window
        if (now >= startTime && now <= endTime) {
            if (user.lastPostDate && user.lastPostDate >= startTime && user.lastPostDate <= endTime) {
                // User already posted in this window; return without incrementing
                return res.status(200).json({ 
                    message: 'Streak already counted for this window', 
                    streakCount: user.streakCount 
                });
            } else {
                // First post in this window → Increase streak
                newStreakCount += 1;
            }
        } else {
            // User is posting **outside** the streak window → do NOT update streak, just return
            return res.status(400).json({ 
                error: 'Not within the active streak window', 
                streakCount: user.streakCount 
            });
        }

        // Update user streak and last post date
        const updatedUser = await User.findOneAndUpdate(
            { userID },
            { 
                $set: { streakCount: newStreakCount, lastPostDate: now}
            },
            { new: true }
        );

        res.status(200).json({ streakCount: updatedUser.streakCount });

    } catch (error) {
        console.error('Error updating streak:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};