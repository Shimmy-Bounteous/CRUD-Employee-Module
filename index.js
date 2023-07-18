require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');
const { populateInitialData } = require('./seed');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse body to JSON
app.use(express.json());

//Middleware to log request to before it's handled (i.e. sent to the actual endpoint) 
app.use('/', (req, res, next)=>{
  console.log(`\nRequest Method: ${req.method} \t Request URL: ${req.url}`);
  if(req.method === "PATCH" || req.method === "POST")
    console.log(`Request Body:\n ${req.body}`);
  next();
});

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