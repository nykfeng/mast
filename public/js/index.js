const names = await page.evaluate(() => {
  return Array.from(document.querySelectorAll("li").map((x) => x.textContent));
});

const photos = page.$$eval("img", (imgs) => {
  return imgs.map((x) => x.src);
});

await page.click("#clickme");
const clickedData = await page.$eval("#data", (el) => el.textContent);


await page.click('#ourform button');
await page.waitForNavigation();

await Promise.all([page.click('#ourform button'), page.waitForNavigation()])