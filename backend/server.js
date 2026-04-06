const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connect
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smartboard';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/ppt',     require('./routes/ppt'));
app.use('/api/analyse', require('./routes/analyse'));

app.listen(5000, () =>
  console.log(`🚀 Server: http://localhost:${process.env.PORT}`)
);