const webConfig = require("../config/websiteConfig.json");
const dataCleanser = require("../util/dataCleanser");
const scraper = require("../scrapers/pupBot");

// load config
const website = webConfig[0];

// get selected date (max 10 days ago)

// choose bot

// start bot in loop (first websites then pages), criteria = date !end, max day diff = 10

// receive data
let pageNum = 2;
(async () => {
  const data = await scraper.pupBot(website, pageNum);
  console.log(data);
  console.log("Number of qualified transactions: ", data.length);
})();

// end loop on meeting criteria

// cleanse and validate data; fix date data format, fix title format, remove foreign language

// save data to db
