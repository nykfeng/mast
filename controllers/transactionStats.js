const TransactionStat = require("../models/TransactionStat");
const dataAggregator = require("../util/dataAggregator");

// -=-=-=-=-=-=-=-=-=-=- CRUD actions -=-=-=-=-=-=-=-=-=-=-=-
module.exports.createTransactionStat = async function (selectedDate, data) {
  const dateExisted = await TransactionStat.findById(
    new Date(selectedDate).toLocaleDateString()
  );

  if (dateExisted) {
    dateExisted.totalNumber = data.length;
    dateExisted.siteBreakdown = dataAggregator.numberOfTransactionBySite(data);
    await dateExisted.save();
  } else {
    const transactionStat = new TransactionStat({
      _id: new Date(selectedDate).toLocaleDateString(),
      totalNumber: data.length,
      siteBreakdown: dataAggregator.numberOfTransactionBySite(data),
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
