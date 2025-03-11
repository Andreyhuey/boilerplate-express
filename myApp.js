require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");

let app = express();

console.log("Hello World");

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
