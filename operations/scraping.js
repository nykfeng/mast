const webConfig = require("../config/websiteConfig.json");
const dataProcessor = require("../util/dataProcessor");
const scraper = require("../scrapers/pupBot");
const timer = require("../util/timer");

// load config
const website = webConfig[0];

// get selected date (max 10 days ago)

// choose bot

// start bot in loop (first websites, then pages), criteria = date !end, max day diff = 10
let transactionNumber = 0;
let pageNum = 1;
(async () => {
  for (let web of webConfig) {
    for (let pageNum = 1; pageNum <= 2; pageNum++) {
      const data = await scraper.pupBot(web, pageNum);
      console.log(data);
      transactionNumber += data.length;

      await timer.waitFor(5000);
    }
  }
  console.log("Number of qualified transactions: ", transactionNumber);
})();
// receive data
// let pageNum = 2;
// (async () => {
//   const data = await scraper.pupBot(website, pageNum);
//   console.log(data);
//   console.log("Number of qualified transactions: ", data.length);
// })();

// end loop on meeting criteria

// cleanse and validate data; fix date data format, fix title format, remove foreign language

// save data to db
