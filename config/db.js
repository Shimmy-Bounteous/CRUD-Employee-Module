const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   the below properties are depricated
      //   useFindAndModify: false,
      //   useCreateIndex: true      
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas', error);
    process.exit(1);
  }
}

module.exports = connectDB;
