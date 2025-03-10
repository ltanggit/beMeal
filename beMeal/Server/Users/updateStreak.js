import User from './userSchema.js'; // Import the User schema

// Function to update a user's streak
export const updateStreak = async (req, res) => {
    try {
        // Grab user ID from request body
        const userID = req.body.userID;

        // Must send user ID
        if (!userID) {
            return res.status(400).json({ error: 'Must supply a userID' });
        }

        // Find the user
        const user = await User.findOne({ userID });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const now = new Date(); // Get current date
        const lastPostDate = user.lastPostDate; // Assuming there's a lastPostDate field
        const STREAK_WINDOW_HOURS = 2; // Define the streak time frame

        let newStreakCount = 0;

        if (lastPostDate) {
            const timeDifference = (now - lastPostDate) / (1000 * 60 * 60); // Convert to hours

            if (timeDifference <= STREAK_WINDOW_HOURS) {
                newStreakCount = user.streakCount + 1; // Increase streak
            }
        }

        // Update user streak and last post date
        const updatedUser = await User.findOneAndUpdate(
            { userID },
            {
                $set: { streakCount: newStreakCount, lastPostDate: now }
            },
            { new: true }
        );

        res.status(200).json({ streakCount: updatedUser.streakCount });

    } catch (error) {
        console.error('Error updating streak:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
