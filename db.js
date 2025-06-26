const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    // Use only Atlas connection string
    const connectionString = process.env.MONGODB_ATLAS_URI;

    if (!connectionString) {
      throw new Error(
        "MONGODB_ATLAS_URI is not defined in environment variables"
      );
    }

    // Modern connection without deprecated options
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      retryWrites: true,
      w: "majority",
    });

    console.log("MongoDB Atlas connected successfully");

    // Connection event handlers
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to Atlas");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from Atlas");
    });
  } catch (error) {
    console.error("Atlas connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
