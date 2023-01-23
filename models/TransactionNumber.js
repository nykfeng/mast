const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionNumberSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  totalNumber: {
    type: Number,
    default: 0,
  },
  siteBreakdown: [
    {
      siteName: { type: String },
      number: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("TransactionNumber", TransactionNumberSchema);
