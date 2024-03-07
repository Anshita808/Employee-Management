const express = require("express");

const employRoute = express.Router();

const employController = require("../controller/employee.controller");

employRoute.post("/register", employController.register);
employRoute.post("/login", employController.login);

module.exports = employRoute;
