const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/smartboard')
  .then(async () => {
    await mongoose.connection.collection('users').deleteMany({});
    console.log('✅ All users deleted!');
    process.exit();
  });