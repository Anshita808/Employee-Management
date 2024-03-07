const EmployModel = require("../models/employ.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, password,location, role } = req.body;

    const isUserPresent = await EmployModel.findOne({ email });

    if (isUserPresent)
      return res.status(403).send({ msg: "Employee already registered" });

    const hashPass = await bcrypt.hash(password, 10);

    const newEmp = new EmployModel({ name, email, password: hashPass,location, role });

    await newEmp.save();

    res.status(200).send({ msg: "Employee created", newEmp });
  } catch (error) {
    res.status(503).send({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExists = await EmployModel.findOne({ email });

    if (!isUserExists) return res.status(403).send({ msg: "Employ not found" });

    const isPassCorrect = await bcrypt.compare(password, isUserExists.password);

    if (!isPassCorrect)
      return res.status(403).send({ msg: "Wrong credential" });

    const token = await jwt.sign(
      { userId: isUserExists._id },
      process.env.secreteKey
    );

    res.status(200).send({ msg: "Login Success", token, isUserExists });
  } catch (error) {}
};

module.exports = {
  register,
  login,
};
