const mongoose = require('mongoose');

const connectDB = async () => {
  let dbUrl = 'mongodb://localhost/contactApp';
  return mongoose
    .connect(dbUrl)
    .then(() => {
      console.log('Database Connection Successful');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
