const puppeteer = require("puppeteer");

module.exports.pupBot = async (website, pageNum) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.setDefaultTimeout(60000);

  const { paginationType, pagination } = website;
  const url = getPageUrl(pageNum, { paginationType, pagination });

  console.log("Accessing: ", url);
  await page.goto(url);

  await page.waitForSelector(website.selectors.getSection);
  console.log("Section selector loaded successful");

  const obtainedData = await page.evaluate((website) => {
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

  await browser.close();

  return obtainedData;
};

function getPageUrl(pageNum, options) {
  const pagination = options.pagination[options.paginationType];

  // base url + page number query + page number
  const pageUrl = pagination.baseUrl + pagination.pageNumber + pageNum;
  return pageUrl;
}
