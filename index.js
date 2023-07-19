require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');
const { populateInitialData } = require('./seed');
const { logRequest } = require('./middleware/logRequest');
const { validatePassword } = require('./middleware/passwordValidator');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse body to JSON
app.use(express.json());

//Middleware to log request to before it's handled (i.e. sent to the actual endpoint) 
app.use('/', logRequest);

//Middleware to validate password 
app.use('/users/signUp', validatePassword);

// Routes
app.use('/employees', employeeRoutes);
app.use('/users', userRoutes);

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