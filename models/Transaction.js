const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: function () {
      return new Date().toLocaleDateString();
    },
  },
  news: [
    {
      title: { type: String, required: true },
      href: { type: String },
      hostName: { type: String },
      date: { type: Date, required: true },
    },
  ],
});

TransactionSchema.post('save', function(doc) {
    console.log("==== Finished saving transaction news to database ====");
});

module.exports = mongoose.model("Transaction", TransactionSchema);
