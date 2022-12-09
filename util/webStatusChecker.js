const axios = require("axios");
const webConfig = require("../config/websiteConfig.json");

module.exports = async () => {
  const result = [];
  try {
    for (let web of webConfig) {
      const ping = await axios.get(web.entryUrl).catch(function (error) {
        console.log(error);
      });
      const { status } = ping || { status: 403 };
      result.push({
        name: web.name,
        status,
        url: web.entryUrl,
      });
    }
    return result;
  } catch (err) {
    console.log("try catch error log", err);
  }
};
