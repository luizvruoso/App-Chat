var express = require("express");

const controllerMessages = require("../controller/controllerMessages");

module.exports = controllerMessages;
/*
module.exports = function (route) {
  //controllerMessages.hello(route, req, res);
  route.get("/", function (req, res) {
    controllerMessages.hello(route, req, res);
  });
};*/
