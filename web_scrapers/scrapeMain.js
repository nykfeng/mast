const scrapeBusinesswire = require("./scrapeBusinesswire");

const businesswire = {
  url: "https://www.businesswire.com/portal/site/home/news/subject/?vnsId=31333",
  maxPageNum: 20,
};

const scrape = async () => {
  let newsItemObjectList = await scrapeBusinesswire(
    businesswire.url,
    businesswire.maxPageNum
  );
  console.log(newsItemObjectList);
};

scrape();
