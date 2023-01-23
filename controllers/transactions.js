const Transaction = require("../models/Transaction");

// -=-=-=-=-=-=-=-=-=-=- CRUD actions -=-=-=-=-=-=-=-=-=-=-=-
module.exports.createTransactions = function (data) {
  const transaction = new Transaction({
    date: new Date().toLocaleDateString(),
    news: data,
  });
  transaction
    .save()
    .then(() => {
      console.log("Transaction saved");
    })
    .catch((err) => {
      console.log("Failed to save transactions");
      console.log("error is: ", err);
    });
};
