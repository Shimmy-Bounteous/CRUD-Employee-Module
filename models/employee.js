const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  eid: {type: Number, required: true},
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  skills: { type: [String], required: false },
  designation: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
