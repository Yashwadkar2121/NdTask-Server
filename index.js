require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

connectToMongo();
const app = express();
const port = 5000;

// middleware for sending JSON body to DB
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "https://nd-task.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// Available Routes
app.use("/api/transactions", transactionRoutes);
app.get("/", (req, res) => {
  res.send("Hello World from server");
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
