const puppeteer = require("puppeteer");
const dataCleanser = require("../util/dataCleanser");
const webConfig = require("../config/websiteConfig.json");

const website = webConfig[3];

// ==== testing code =====
console.log(website);
website.exclusionTypeList.forEach((excludeType) => {
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

  console.log("Accessing: ", website.entryUrl);
  const response = await page.goto(website.entryUrl);

  // if response.headers.status != 200
  // stop operations
  // await page.close()?
  await page.waitForSelector(website.selectors.getSection);

  const scrapedData = await page.evaluate((website) => {
    const result = [];
    const newsPieceEls = document.querySelectorAll(
      website.selectors.getSection
    );

    for (let el of newsPieceEls) {
      // run exlcusion list to exclude unwanted items
      let toExclude = false;
      website.exclusionTypeList.forEach((excludeType) => {
        let getExcludeValue = "";
        // if the element exists
        if (el.querySelector(website.exclusionSelectors[excludeType])) {
          getExcludeValue = el
            .querySelector(website.exclusionSelectors[excludeType])
            [website.exclusionSelectorAttributes[excludeType]].trim();
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
      // if not, grab the main three pieces of information
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

  // ==== testing code =====
  console.log("Out of evaluate");
  console.log(scrapedData);
  console.log("Size: ", scrapedData.length);

  await browser.close();
};

pupScrape();
