const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

router.post('/add', addEmployee);
router.get('/get/:eid', getEmployee);
router.get('/get', getAllEmployees);
router.patch('/update/:eid', updateEmployee);
router.delete('/delete/:eid', deleteEmployee);

module.exports = router;
