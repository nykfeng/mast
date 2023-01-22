const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const TransactionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  hostName: {
    type: String,
    trim: true,
  },
});


module.exports = mongoose.model("Transaction", TransactionSchema);