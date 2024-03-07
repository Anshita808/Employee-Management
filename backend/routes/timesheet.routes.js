const express = require("express");

const timeSheetRoute = express.Router();

const timeSheetController = require("../controller/timesheet.controller");
const { auth, isManager } = require("../middleware/auth");

timeSheetRoute.get("/get", auth, timeSheetController.getEmployDetails);
timeSheetRoute.get("/getsingle", auth, timeSheetController.getSingleEmp);
timeSheetRoute.post("/create", auth, timeSheetController.createTimeSheet);
timeSheetRoute.put(
  "/rate/:id",
  auth,
  isManager,
  timeSheetController.managerUpdateRate
);
timeSheetRoute.put(
  "/assignmanager/:employeeId",
  auth,
  isManager,
  timeSheetController.assignManager
);

module.exports = timeSheetRoute;
