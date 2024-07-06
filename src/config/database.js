const mongoose = require("mongoose");
const DBURL = process.env.DBURL;

const connectDB = async () => {
  try {
    await mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30 seconds
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB();
