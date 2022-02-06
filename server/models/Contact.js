const mongoose = require('mongoose');
const Joi = require('joi');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  address: {
    type: String,
    required: [true, 'Address required'],
  },
  email: {
    type: String,
    required: [true, 'Email required'],
  },
  phone: {
    type: Number,
    required: [true, 'Phone required'],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Contact = new mongoose.model('Contact', ContactSchema);

const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    address: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(100000).max(1000000000).required(),
  });

  return schema.validate(data);
};
module.exports = {
  validateContact,
  Contact,
};
