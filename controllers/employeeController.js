const Employee = require('../models/employee');
const mongoose = require('mongoose')

// Add employee details to the database
async function addEmployee(req, res) {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Get employee details
async function getEmployee(req, res) {
  try {
    // -- Use the below template for when using an id field of MongoDB ObjectID Type
    // if(!mongoose.Types.ObjectId.isValid(req.params.eid)){
    //   res.status(400).json({success: false, message: 'Invalid Employee ID'})
    // }
    // else{
    //    // try block code  
    // }
    const eid = req.params.eid;
    const employee = await Employee.find({"eid": eid});
    console.log(employee);
    if(employee.length !== 0)
      res.json({ success: true, data: employee });
    else{
      // console.log('Invalid Employee ID');
      res.status(400).json({ success: false, message: 'Invalid Employee ID'});
    }
  } catch (error) {
    // console.log(error.message);
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
    console.log(employee);
    if(employee !== null)
      res.status(202).json({ success: true, data: employee });
    else{
      // console.log('Invalid Employee ID');
      res.status(400).json({ success: false, message: 'Invalid Employee ID'})
    } 
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete an employee
async function deleteEmployee(req, res) {
  try {
    const employee = await Employee.findOneAndDelete({"eid": req.params.eid});
    if(employee !== null)
      res.status(202).json({ success: true, message: 'Employee deleted successfully' });
    else{
      // console.log('Employee not found');
      res.status(400).json({success:false, message: "Employee not found"});
    }
  } catch (error) {
    // console.log(error.message);
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
