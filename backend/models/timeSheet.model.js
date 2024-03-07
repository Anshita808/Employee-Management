const mongoose = require("mongoose");

const timeSheetSchema = mongoose.Schema({
  employId: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
  date: { type: Date, default: Date.now },
  task: { type: String, require: true },
  hoursWorked: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  isFilled: { type: Boolean, default: true },
});

module.exports = mongoose.model("TimeSheet", timeSheetSchema);
