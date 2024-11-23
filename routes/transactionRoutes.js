const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");

// Route to add a transaction
router.post("/add", addTransaction);

// Route to get all transactions
router.get("/list", getTransactions);

module.exports = router;
