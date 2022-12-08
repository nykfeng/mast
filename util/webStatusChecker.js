const axios = require("axios");
const webConfig = require("../config/websiteConfig.json");

module.exports = async () => {
  const result = [];
  try {
    for (let web of webConfig) {
      const ping = await axios.get(web.websiteEntryUrl);
      const { status } = ping;
      result.push({
        name: web.websiteName,
        status,
      });
    }

    return result;
  } catch (err) {
    console.log(err);
  }
};
