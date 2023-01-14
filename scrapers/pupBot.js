const puppeteer = require("puppeteer");
const chalk = require("chalk");

module.exports.pupBot = async (website, pageNum, socket) => {
  const msgOrigin = "pupBot:~ ";
  let message = "";
  let errorStopOutCondition = false;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.setDefaultTimeout(60000);

  const { paginationType, pagination } = website;
  const url = getPageUrl(pageNum, { paginationType, pagination });

  try {
    console.log(chalk.bgGreen("Accessing: ", url));
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.setJavaScriptEnabled(true);
    for (const [key, selector] of Object.entries(website.selectors)) {
      await page.waitForSelector(selector);
    }

    message = "All CSS selectors loaded successfully";
    console.log(message);
    socket.send(JSON.stringify({ msgOrigin, message }));
  } catch (err) {
    errorStopOutCondition = true;
    console.log(msgOrigin, chalk.bgRed(err.message));
    socket.send(
      JSON.stringify({
        msgOrigin,
        message: err.message || `error encountered while accessing ${url}`,
      })
    );
    const htmlData = await page.evaluate(
      () => document.querySelector("*").outerHTML
    );
    console.log(htmlData);
  }

  const data = await page.evaluate((website) => {
    const result = [];
    const newsPieceEls = document.querySelectorAll(
      website.selectors.getSection
    );

    for (let el of newsPieceEls) {
      // 1. ---- run exlcusion list to exclude unwanted items
      let toExclude = false;
      // exclusionTypeList could contain "language", "source"
      // We don't want foreign language news, and from certain sources
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

      // 2. ---- determined this item is not wanted (toExclude), skip this iteration of newsPieceEls
      if (toExclude) continue;
      // 3. ---- if not, grab the different pieces of information
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
        hostName: window.location.host,
      });
    }
    return result;
  }, website);

  await browser.close();

  message = `Finished reading current page with [${data.length}] transactions read`;
  console.log(msgOrigin, message);
  socket.send(
    JSON.stringify({
      msgOrigin,
      message,
    })
  );
  return { data, errorStopOutCondition };
};

function getPageUrl(pageNum, options) {
  const pagination = options.pagination[options.paginationType];

  // base url + page number query + page number
  const pageUrl = pagination.baseUrl + pagination.pageNumber + pageNum;
  return pageUrl;
}
