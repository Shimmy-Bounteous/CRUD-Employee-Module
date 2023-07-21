const express = require('express');
const router = express.Router();

// middleware to verify token
const { verifyToken } = require('../middleware/verifyToken');

const {
  addEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

router.post('/add', addEmployee);
router.get('/get/:eid', verifyToken, getEmployee);
router.get('/get', verifyToken, getAllEmployees);
router.patch('/update/:eid', verifyToken, updateEmployee);
router.delete('/delete/:eid', verifyToken, deleteEmployee);

module.exports = router;
