// ===== put together the number of transaction by site
module.exports.numberOfTransactionBySite = function (dailyData) {
  let groupData = dailyData.reduce((groups, dailydata) => {
    let hostName = dailyData.hostName;
    if (!groups[hostName]) {
      groups[hostName] = [];
    }
    groups[hostName].push(dailydata);
    return groups;
  }, {});

  console.log("groupData: ");
  console.log(groupData);

  return groupData;
};
