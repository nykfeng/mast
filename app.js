const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const WebSocket = require("ws");

const PORT = process.env.PORT || 4080;

// WebSocket connection
const server = new WebSocket.Server({ port: 8080 });
let socket;

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
  const data = await scraping(selectedDate, socket);
  res.send(data);
  // You can use the response.json() method to send a JSON response,
  // which is equivalent to calling response.send() with a JSON-serialized value.
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
