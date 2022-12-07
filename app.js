const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const PORT = process.env.PORT || 4080;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("content/home");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
