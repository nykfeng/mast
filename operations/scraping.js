const webConfig = require("../config/websiteConfig.json");
const dataProcessor = require("../util/dataProcessor");
const scraper = require("../scrapers/pupBot");
const timer = require("../util/timer");

const toBeStored = [];

const selectedDate = new Date();
selectedDate.setDate(selectedDate.getDate() - 3);

// load config


// get selected date (max 10 days ago)

// choose bot

// start bot in loop (first websites, then pages), criteria = date !end, max day diff = 10
let transactionNumber = 0;

(async () => {
  for (let website of webConfig) {
    let stopConditionForCurrentSite = false;
    for (let pageNum = 1; pageNum <= 3; pageNum++) {
      const data = await scraper.pupBot(website, pageNum);

      transactionNumber += data.length;

      if (!stopConditionForCurrentSite) {
        for (let eachNews of data) {
          const title = dataProcessor.newsTitle(eachNews.title);
          const date = dataProcessor.newsDate(eachNews.date);
          const hostName = dataProcessor.newsHostname(eachNews.hostName);
          const href = eachNews.href;

          console.log("news date: ", date.toDateString());
          console.log("selected date: ", selectedDate.toDateString());
          console.log("isEnglish: ", dataProcessor.isNewsInEnglish(title));

          if (date.getDate() < selectedDate.getDate()) {
            stopConditionForCurrentSite = true;
            break;
          }

          if (
            date.toDateString() === selectedDate.toDateString() &&
            dataProcessor.isNewsInEnglish(title)
          ) {
            toBeStored.push({
              title,
              date,
              href,
              hostName,
            });
          }
        }
      }

      if (stopConditionForCurrentSite) break;
      await timer.waitFor(5000);
    }
  }
  console.log("toBeStored: ", toBeStored.length, " transactions");
  console.log(toBeStored);
  console.log("Number of qualified transactions: ", transactionNumber);
})();

// end loop on meeting criteria

// cleanse and validate data; fix date data format, fix title format, remove foreign language

// save data to db
