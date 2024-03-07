const EmployModel = require("../models/employ.model");
const TimeSheetModel = require("../models/timeSheet.model");

const createTimeSheet = async (req, res) => {
  try {
    const userId = req.userId;
    const { task, hoursWorked, rating } = req.body;

    const currentDate = new Date();

    const existingTimesheet = await TimeSheetModel.findOne({
      employId: userId,
      date: {
        $gte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
        $lt: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        ),
      },
    });

    if (existingTimesheet) {
      return res
        .status(403)
        .send({ msg: "You have already filled the timesheet for today" });
    }

    const timeSheet = new TimeSheetModel({
      employId: userId,
      task,
      date: currentDate,
      hoursWorked: hoursWorked,
      rating: rating,
    });
    await timeSheet.save();
    res.status(200).send({ msg: "Timesheet created" });
  } catch (error) {
    res.status(503).send({ msg: error.message });
  }
};

const getSingleEmp = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await EmployModel.findById(userId);
    if (!user) return res.status(403).send({ msg: "Employ not Found" });

    res.status(200).send(user);
  } catch (error) {
    res.status(503).send({ msg: error.message });
  }
};

const getEmployDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const employee = await EmployModel.findById(userId);

    if (!employee) return res.status(403).send({ msg: "Employee not found" });

    let employees;
    let timeSheets;

    if (employee.role === "manager") {
      employees = await EmployModel.find({ role: "employee" });
      timeSheets = await TimeSheetModel.find({
        employId: { $in: employees.map((emp) => emp._id) },
      });
    } else {
      employees = await EmployModel.find({
        _id: userId,
        role: { $ne: "manager" },
      });
      timeSheets = await TimeSheetModel.find({ employId: userId });
    }

    if (!timeSheets)
      return res.status(403).send({ msg: "Timesheets not found" });

    const employeeDetails = employees.map((emp) => {
      const empTimeSheets = timeSheets.filter(
        (ts) => ts.employId.toString() === emp._id.toString()
      );
      return {
        employee: emp,
        timeSheets: empTimeSheets,
      };
    });

    res.status(200).send({ employeeDetails });
  } catch (error) {
    res.status(503).send({ msg: error.message });
  }
};

const managerUpdateRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    await TimeSheetModel.findByIdAndUpdate(id, { rating });
    res.status(200).send({ msg: "Rating update" });
  } catch (error) {
    res.status(503).send({ msg: error.message });
  }
};

const assignManager = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const managerId = req.userId;

    const employee = await EmployModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    if (managerId) {
      const manager = await EmployModel.findById(managerId);
      if (!manager || manager.role !== "manager") {
        return res.status(400).send({ msg: "Invalid manager ID" });
      }
    }

    employee.reportingManager = managerId || null;
    await employee.save();

    res.status(200).send({ msg: "Manager assigned successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTimeSheet,
  managerUpdateRate,
  getEmployDetails,
  getSingleEmp,
  assignManager,
};
