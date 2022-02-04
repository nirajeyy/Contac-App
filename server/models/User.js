const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Required'],
  },
  email: {
    type: String,
    required: [true, 'Email Required'],
  },
  password: {
    type: String,
    required: [true, 'Password Required'],
  },
});

const User = new mongoose.model('User', UserSchema);

module.exports = User;
