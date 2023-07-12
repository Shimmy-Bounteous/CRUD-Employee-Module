const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

router.post('/', addEmployee);
router.get('/:eid', getEmployee);
router.get('/', getAllEmployees);
router.patch('/:eid', updateEmployee);
router.delete('/:eid', deleteEmployee);

module.exports = router;
