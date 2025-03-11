/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

const bGround = require("fcc-express-bground");
const myApp = require("./myApp");
const express = require("express");
const app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use((req, res, next) => {
    const allowedOrigins = [
      "https://narrow-plane.gomix.me",
      "https://www.freecodecamp.com",
    ];
    const origin = req.headers.origin || "*";
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(origin);
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    }
    next();
  });
}

// Middleware function to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.use("/public", express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, () => {
  bGround.log(`Node is listening on port ${port}...`);
});

/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/
