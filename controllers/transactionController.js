const Transaction = require("../models/Transaction");

// Add a new transaction
const addTransaction = async (req, res) => {
  try {
    const { username, amount, time } = req.body;

    const newTransaction = new Transaction({
      username,
      amount,
      time,
    });

    await newTransaction.save();
    res.status(201).json({
      message: "Transaction added successfully",
      data: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transactions", error });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
};
