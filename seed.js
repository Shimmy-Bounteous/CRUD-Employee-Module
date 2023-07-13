const Employee = require("./models/employee");
const { initialEmployeeData } = require("./repositories/employeeRepository");

// Populate initial data
async function populateInitialData() {
    try {
      // Check if there are already employees in the database
      const existingEmployees = await Employee.countDocuments();
      if (existingEmployees > 0) {
        console.log('Initial data already populated. Skipping...');
        return;
      }
  
      // Get initial employees data
      const employees = initialEmployeeData;
  
      // Insert the employees into the database
      await Employee.create(employees);
  
      console.log('Initial data populated successfully.');
    } catch (error) {
      console.error('Failed to populate initial data:', error);
      process.exit(1);
    }
  }

module.exports = { populateInitialData };