// Purpose: Connects your app to MongoDB using mongoose.connect(...).
// Why? Centralizes database setup, making it easy to manage DB connection logic.

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log('MongoDB connected successfully');
    }   catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); 
    }
};

module.exports = connectDB;
