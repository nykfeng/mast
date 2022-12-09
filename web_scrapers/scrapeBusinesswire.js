const puppeteer = require("puppeteer");

async function scrapeNews(url, maxPageNum) {
  //open the page
  const browser = await puppeteer.launch(); //{headless: false} for seeing the action
  let page = await browser.newPage();
  await page.goto(url);

  let nextPageUrl = null;

  for (let pageNum = 1; pageNum <= maxPageNum; pageNum++) {
    if (nextPageUrl != null) {
      await page.goto(nextPageUrl);
    }

    //=================================================================================================================================================================================
    //evaluate(), use frontend code to access DOM in this function
    //since it's like frontend, backend feature is not valid here, no require(), and consoloe.log() will be on the browser, not in the terminal
    //and this function scope can't interact with anything outside of the scope, we have to pass argument like https://stackoverflow.com/questions/46088351/how-can-i-pass-variable-into-an-evaluate-function
    const grabNews = await page.evaluate((pageNum) => {
      const newsItemObjectList = [];
      const today = new Date();

      //get all the relavant headline <li>s
      const newsElements = document.body.querySelectorAll("#headlines ul li");

      let over = false;
      //check for each <li> (news), if the time is today's, create object and store info into object of class NewsItem
      for (li of newsElements) {
        //get the timestamp of the news
        let dateStr = li.querySelector("time").dateTime;
        const [year, month, day] = dateStr.split("T")[0].split("-");

        //check if the time is today, if yes, store info in object
        if (
          year == today.getFullYear() &&
          month == today.getMonth() + 1 &&
          day == today.getDate()
        ) {
          //date for object
          const date = `${year}-${month}-${day}`;

          //imgUrlList for object
          const imgUrlList = [];
          let imgElements = li.querySelectorAll(
            "img[alt='View Press Release']"
          );
          imgElements.forEach((img) => {
            imgUrlList.push(img.src);
          });

          //newUrl for object
          let newsUrl = null;
          let anchorElement = li.querySelector("a.bwTitleLink");
          newsUrl = anchorElement.href;

          //title for object
          const title = anchorElement.children[0].innerText;

          //create object of class NewsItem
          newsItemObjectList.push({ date, imgUrlList, newsUrl, title });
        } else {
          over = true;
          break;
        }
      }
      //end of news-item-object-creating loop

      nextPageUrl = document.body.querySelector(
        `#paging div :nth-child(${pageNum + 1})`
      ).href;

      return [newsItemObjectList, over, nextPageUrl];
    }, pageNum);
    //===================================================================================================================================================================================

    const [newsItemObjectList, over] = grabNews;
    nextPageUrl = grabNews[2];

    // console.log(newsItemObjectList);
    // console.log(
    //   `page${pageNum}===============================================================================================================================================`
    // );

    if (over) {
      console.log("over");
      await browser.close();
      return newsItemObjectList;
    }
  }
  //end of page-scraping loop
}

module.exports = scrapeNews;
