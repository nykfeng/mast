const axios = require("axios");
const webConfig = require("../config/websiteConfig.json");


module.exports = async () => {
  const result = [];
  for (let web of webConfig) {
    const ping = await axios.get(web.websiteEntryUrl);
    const { status } = ping;
    result.push({
      websiteName: web.websiteName,
      webStatus: status,
    });
  }

  console.log(result);
  return result;
};

