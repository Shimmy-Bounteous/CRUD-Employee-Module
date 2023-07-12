const Employee = require('../models/employee');

// Add employee details to the database
async function addEmployee(req, res) {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Get employee details
async function getEmployee(req, res) {
  try {
    const eid = req.params.eid;
    const employees = await Employee.find({"eid": eid});
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Get all employee details
async function getAllEmployees(req, res) {
    try {
      const employees = await Employee.find();
      res.json({ success: true, data: employees });
    } catch (error) {
      // console.log(error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  }

// Update employee details
async function updateEmployee(req, res) {
  try {
    const employee = await Employee.findOneAndUpdate(
      {"eid": req.params.eid},
      req.body,
      { new: true }
    );
    res.status(202).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete an employee
async function deleteEmployee(req, res) {
  try {
    const data = await Employee.findOneAndDelete({"eid": req.params.eid});
    if(data !== null)
      res.status(202).json({ success: true, message: 'Employee deleted successfully' });
    else
      res.status(400).json({success:false, message: "Employee not found"});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  addEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
};
