var express = require("express");

const usersController = require("../controller/UsersController");

module.exports = function (route) {
  route.get("/getUser", function (req, res) {
    usersController.getUser(route, req, res);
  });

  route.post("/postUser", function (req, res) {
    usersController.postUser(route, req, res);
  });

  route.post("/addContact", function (req, res) {
    usersController.addContact(route, req, res);
  });

  route.get("/getContacts", function (req, res) {
    usersController.getContacts(route, req, res);
  });

  route.delete("/deleteContact", function (req, res) {
    usersController.deleteContact(route, req, res);
  });

  route.get("/getAllUsers", function (req, res){
    usersController.getAllUsers(route, req, res);
  });
  route.post("/createGroup", function (req, res){
    usersController.createGroup(route, req, res)
  });
  route.delete("/deleteGroup", function (req, res){
    usersController.deleteGroup(route, req, res)
  });
};
