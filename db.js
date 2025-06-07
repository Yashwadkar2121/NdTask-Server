const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    // Determine which connection string to use
    const connectionString =
      process.env.USE_ATLAS_DB === "true"
        ? process.env.MONGODB_ATLAS_URI
        : process.env.MONGODB_LOCAL_URI;

    // Modern connection without deprecated options
    await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully");

    // Connection event handlers
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
