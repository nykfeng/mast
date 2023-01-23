const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionStatSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: function () {
      return new Date().toLocaleDateString();
    },
  },
  totalNumber: {
    type: Number,
    default: 0,
  },
  siteBreakdown: [
    {
      siteDomain: { type: String },
      number: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("TransactionStat", TransactionStatSchema);
