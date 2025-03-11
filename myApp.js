require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");

let app = express();

console.log("Hello World");

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/name", (req, res) => {
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
});

app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({ time: req.time });
});

module.exports = app;
