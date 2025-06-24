require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "https://nd-task.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow this origin"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/transactions", transactionRoutes);
app.get("/", (req, res) => {
  res.send("Hello World from server");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
