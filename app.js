const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const PORT = process.env.PORT || 4080;

// importing from other modules
const webStatusCheck = require("./util/webStatusChecker");
const transactionNumberForGraph = require("./seeding/transactionNumberByDate.json");
const scraping = require("./operations/scraping");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("content/home");
});

app.get("/webStatus", async (req, res) => {
  const result = await webStatusCheck();
  res.json(result);
});

app.get("/graphStatsDailyTransactionNumber", async (req, res) => {
  res.json(transactionNumberForGraph);
});

app.get("/scrape-now", async (req, res) => {
  console.log(req.query.date);
  const selectedDate = new Date(req.query.date);
  await scraping(selectedDate);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
