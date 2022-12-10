const puppeteer = require("puppeteer");
const dataCleanser = require("../util/dataCleanser");
const webConfig = require("../config/websiteConfig.json");

const website = webConfig[1];

console.log(website);

website.exclusionList.forEach((excludeType) => {
  console.log("excludeType: ", excludeType);
  console.log(
    "website.exclusionSelectors[excludeType] ",
    website.exclusionSelectors[excludeType]
  );
  console.log(
    "website.exclusionSelectorAttributes[excludeType]: ",
    website.exclusionSelectorAttributes[excludeType]
  );
});

const pupScrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(website.entryUrl);
  console.log("Accessing: ", website.entryUrl);
  page.waitForSelector(website.selectors.getSection);

  const scrapedData = await page.evaluate((website) => {
    const result = [];
    const newsPieceEls = document.querySelectorAll(
      website.selectors.getSection
    );

    for (let el of newsPieceEls) {
      // run exlcusion list to exclude unwanted items
      let toExclude = false;
      website.exclusionList.forEach((excludeType) => {
        let getExcludeValue = "";
        if (el.querySelector(website.exclusionSelectors[excludeType])) {
          getExcludeValue = el.querySelector(
            website.exclusionSelectors[excludeType]
          )[website.exclusionSelectorAttributes[excludeType]];
        }
        if (
          website.exclusionCriteria[excludeType].find(
            (value) => value === getExcludeValue
          ) ||
          false
        ) {
          toExclude = true;
        }
      });

      // determined this item is not wanted, skip this iteration of newsPieceEls
      if (toExclude) continue;
      // grab the main three pieces of information
      result.push({
        title:
          el.querySelector(website.selectors.getTitle)[
            website.selectorAttributes.getTitle
          ] || "",
        date:
          el.querySelector(website.selectors.getDate)[
            website.selectorAttributes.getDate
          ] || "",
        href:
          el.querySelector(website.selectors.getHref)[
            website.selectorAttributes.getHref
          ] || "",
      });
    }
    return result;
  }, website);
  console.log("Out of evaluate");

  console.log(scrapedData);
  console.log("Size: ", scrapedData.length);

  await browser.close();
};

pupScrape();
