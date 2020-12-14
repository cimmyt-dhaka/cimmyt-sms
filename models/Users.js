const
  { Schema, model } = require("mongoose"),

  EmployeesSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true }
  });

module.exports = model("users", EmployeesSchema);
