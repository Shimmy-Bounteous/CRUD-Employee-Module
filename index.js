require('dotenv').config()
const Employee = require('./models/employee');
const express = require('express');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const { initialEmployeeData } = require('./repositories/employeeRepository');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse body to JSON
app.use(express.json());

//Middleware to log request to before it's handled (i.e. sent to the actual endpoint) 
app.use('/', (req, res, next)=>{
  if(req.method === "PATCH" || req.method === "POST")
    console.log(req.body);
  next();
});

// Routes
app.use('/employees', employeeRoutes);

// Populating initial data before starting the server
populateInitialData().then(() => {
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to populate initial data:', error);
  process.exit(1);
});

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
