const webConfig = require("../config/websiteConfig.json");
const dataProcessor = require("../util/dataProcessor");
const scraper = require("../scrapers/pupBot");
const timer = require("../util/timer");
const chalk = require("chalk");

async function scraping(selectedDate, socket) {
  const toBeStored = [];
  let numberOfTransactionsRead = 0;
  const MAX_PAGE_NUMBER_TO_VISIT = 10;
  // For logging, console display
  const msgOrigin = "Scraping Process:~ ";
  let message = "";

  // To loop through all the websites
  for (let website of webConfig) {
    let stopConditionForCurrentSite = false;

    // always start at page 1, this is how information is organized on these sites
    // These sites don't store all the information there, for good measure, set max to 10 pages
    for (let pageNum = 1; pageNum <= MAX_PAGE_NUMBER_TO_VISIT; pageNum++) {
      message = "Visiting: " + website.name + " page " + pageNum;
      socket.send(JSON.stringify({ msgOrigin, message }));

      // Visiting one website one page at a time
      const data = await scraper.pupBot(website, pageNum, socket);

      numberOfTransactionsRead += data.length;

      // if we have not met the stop condition,
      // AKA, an article date older than the selected date
      if (!stopConditionForCurrentSite) {
        // Go through the data obtained so far, to sanitize and organize data
        for (let eachNews of data) {
          const title = dataProcessor.newsTitle(eachNews.title);
          const date = dataProcessor.newsDate(eachNews.date);
          const hostName = dataProcessor.newsHostname(eachNews.hostName);
          const href = eachNews.href;

          // if article date is equal to the selected date, that is the news we want
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

          // If we found an article with an older date than the selected date
          // stop condition for the current site is met
          if (date - selectedDate < 0) {
            stopConditionForCurrentSite = true;
            break;
          }
        }
      }

      // if we stop condition has met for the current site,
      // break out of the loop for going through the pages on the current site
      if (stopConditionForCurrentSite) {
        message =
          "Went through all qualified transactions from " + website.domain;
        console.log(msgOrigin, message);
        socket.send(JSON.stringify({ msgOrigin, message }));

        console.log(
          "================= ",
          chalk.black.bgYellow("Leaving " + website.domain),
          " =================",
          "\n"
        );
        message =
          "================= " +
          ("Leaving " + website.domain) +
          " =================";
        socket.send(JSON.stringify({ msgOrigin, message }));
        break;
      }

      // used to set a timeout in between page visit of the same site
      await timer.waitFor(5000);
    }
  }

  message = "Number of total transactions read: " + numberOfTransactionsRead;
  console.log(msgOrigin, message);
  socket.send(JSON.stringify({ msgOrigin, message }));

  message = "Number of transactions qualified: " + toBeStored.length;
  console.log(msgOrigin, message);
  socket.send(JSON.stringify({ msgOrigin, message }));

  message = "Finished current scraping session~!";
  console.log(msgOrigin, message);
  socket.send(JSON.stringify({ msgOrigin, message }));

  socket.close();

  return toBeStored;
}

module.exports = scraping;
