const express = require('express');
const router = express.Router();

// middleware to verify token
const { verifyToken } = require('../middleware/verifyToken');

// Middleware to validate employee data before adding employee
const { validateAddEmployeeData } = require('../middleware/validateAddEmployeeData');

// Middleware to validate employee data before updating employee
const { validateUpdateEmployeeData } = require('../middleware/validateUpdateEmployeeData');

const {
  addEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

router.post('/add', verifyToken, validateAddEmployeeData, addEmployee);
router.get('/get/:eid', verifyToken, getEmployee);
router.get('/get', verifyToken, getAllEmployees);
router.patch('/update/:eid', verifyToken, validateUpdateEmployeeData, updateEmployee);
router.delete('/delete/:eid', verifyToken, deleteEmployee);

module.exports = router;
