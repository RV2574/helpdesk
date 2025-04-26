const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Clean & modern
        console.log("MongoDB Connected!");
    } catch (error) {
        console.error("Error connecting to MongoDb:", error.message);
        process.exit(1); // Use exit(1) to indicate failure
    }
};

module.exports = connectDB;
