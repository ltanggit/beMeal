import mongoose from 'mongoose';

// Define schema for storing the streak window
const streakWindowSchema = new mongoose.Schema({
    startTime: Date,
    endTime: Date,
    createdAt: { type: Date, default: Date.now }
});

const StreakWindow = mongoose.model('StreakWindow', streakWindowSchema);

// Export model for use in other files
export default StreakWindow;