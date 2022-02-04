require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const app = express();
const authorize = require('./middlewares/authorize');

//middlewares
app.use(express.json());
//routes
app.get('/protected', authorize, (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

app.use('/api', require('./routes/auth'));

//server config
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Listening to the Server at Port ${PORT}`);
});
