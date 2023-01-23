// ===== put together the number of transaction by site
module.exports.numberOfTransactionBySite = function (dailyData) {
  const groupedData = dailyData.reduce((groups, eachDailyData) => {
    let hostName = eachDailyData.hostName;
    if (!groups[hostName]) {
      groups[hostName] = [];
    }
    groups[hostName].push(eachDailyData);
    return groups;
  }, {});

  console.log("groupedData: ");
  console.log(groupedData);

  const siteBreakdownArray = [];

  for (const key in groupedData) {
    siteBreakdownArray.push({
      siteDomain: key,
      number: groupedData[key].length,
    });
  }

  return siteBreakdownArray;
};
