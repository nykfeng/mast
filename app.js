const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const WebSocket = require("ws");
const transaction = require("./controllers/transactions");

const PORT = process.env.PORT || 4080;
// keep the local connection here in case, and we can still run tests
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/mast";

// WebSocket connection
const server = new WebSocket.Server({ port: 8080 });
let socket;

// mongo database connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", true);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

server.on("connection", async function (ws) {
  const msgOrigin = "M.A.S.T. Server:~ ";
  socket = ws;
  console.log(msgOrigin, "Web Socket client connected!");
  ws.send(
    JSON.stringify({
      msgOrigin,
      message: "WebSocket connection established to server",
    })
  );

  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});

// importing from other modules
const webStatusCheck = require("./util/webStatusChecker");
const transactionNumberForGraph = require("./seeding/transactionNumberByDate.json");
const scraping = require("./operations/scraping");
const websiteList = require("./config/websiteList.json");
const webConfig = require("./config/websiteConfig.json");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("content/home");
});

app.get("/source-website-settings", (req, res) => {
  res.render("content/sourceWebsiteSettings", {
    title: "Website Resource Settings Page",
    data: websiteList,
  });
});

app.get("/websiteConfiguration", (req, res) => {
  res.json(webConfig);
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
  const data = await scraping(selectedDate, socket);
  transaction.createTransactions(selectedDate, data);
  res.send(data);
  // You can use the response.json() method to send a JSON response,
  // which is equivalent to calling response.send() with a JSON-serialized value.
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
