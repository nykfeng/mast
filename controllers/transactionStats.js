const TransactionStat = require("../models/TransactionStat");

// -=-=-=-=-=-=-=-=-=-=- CRUD actions -=-=-=-=-=-=-=-=-=-=-=-
module.exports.createTransactionStat = async function (selectedDate, data) {
  const dateExisted = await TransactionStat.findById(
    new Date(selectedDate).toLocaleDateString()
  );

  if (dateExisted) {
    dateExisted.totalNumber = data.totalNumber;
    dateExisted.siteBreakdown = data.siteBreakdown;
    await dateExisted.save();
  } else {
    const transactionStat = new TransactionStat({
      _id: new Date(selectedDate).toLocaleDateString(),
      totalNumber: data.totalNumber,
      siteBreakdown: data.siteBreakdown,
    });
    transactionStat
      .save()
      .then(() => {
        console.log("Transaction saved");
      })
      .catch((err) => {
        console.log("Failed to save transactions");
        console.log("error is: ", err);
      });
  }
};
