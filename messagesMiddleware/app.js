var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var consign = require("consign");
const cors = require("cors");
const controllerMessages = require("./app/controller/controllerMessages");

//require("./app/database");

//app.set("view engine", "ejs");
//app.set("views", "./app/view");

//app.use(express.static("./app/public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
  controllerMessages.hello();
});

//consign().include("app/routes").then("app/controller").into(app);
module.exports = app;
