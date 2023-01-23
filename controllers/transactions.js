const Transaction = require("../models/Transaction");

// -=-=-=-=-=-=-=-=-=-=- CRUD actions -=-=-=-=-=-=-=-=-=-=-=-
module.exports.createTransactions = async function (selectedDate, data) {
  const dateExisted = await Transaction.findById(
    new Date(selectedDate).toLocaleDateString()
  );

  if (dateExisted) {
    console.log("Date already existed");
    console.log("Date is ", dateExisted._id);
    let titles = new Set();
    dateExisted.news.forEach((piece) => {
      titles.add(piece.title);
    });

    data.forEach((newData) => {
      if (!titles.has(newData.title)) {
        dateExisted.news.push(newData);
        console.log("To add the following to ", selectedDate);
        console.log(newData);
      }
    });
    await dateExisted.save();
  } else {
    const transaction = new Transaction({
      _id: new Date(selectedDate).toLocaleDateString(),
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
  }
};
