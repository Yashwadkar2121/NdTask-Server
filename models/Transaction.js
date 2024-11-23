const mongoose = require("mongoose");

// Define the schema
const transactionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
