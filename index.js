require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

// Initialize MongoDB connection
connectToMongo();

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Enhanced CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://nd-task.vercel.app", // Production frontend
  "https://nd-task-client.vercel.app", // Add this if you're using this domain
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS blocked for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Routes
app.use("/api/transactions", transactionRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "ND Task Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(", ")}`);
});
