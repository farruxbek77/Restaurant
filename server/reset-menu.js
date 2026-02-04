const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');

dotenv.config();

const resetMenu = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant';
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connected');

        // Barcha menu itemlarni o'chirish
        await MenuItem.deleteMany({});
        console.log('🗑️  All menu items deleted');

        console.log('\n✅ Menu reset completed! Now run: npm run seed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Reset error:', error);
        process.exit(1);
    }
};

resetMenu();
