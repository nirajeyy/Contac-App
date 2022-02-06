const router = require('express').Router();
const { restart } = require('nodemon');
const authorize = require('../middlewares/authorize');
const { validateContact, Contact } = require('../models/Contact');
const mongoose = require('mongoose');
//C
router.post('/contacts', authorize, async (req, res) => {
  const { error } = validateContact(req.body);
  //validate all the fields
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { name, address, email, phone } = req.body;

  try {
    const doesContactAlreadyExist = await Contact.findOne({ name });
    if (doesContactAlreadyExist) {
      return res
        .status(400)
        .json({ error: 'Contact Already Exists, Go to Edit' });
    }
    const newContact = new Contact({
      name,
      address,
      email,
      phone,
      postedBy: req.user._id,
    });
    const result = await newContact.save();

    return res.status(201).json(result._doc);
  } catch (err) {
    console.log(err);
  }
});
//R
router.get('/contacts', authorize, async (req, res) => {
  try {
    const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
      'postedBy',
      '-password'
    );
    return res.status(200).json({ contacts: myContacts });
  } catch (err) {
    console.log(error);
  }
});
//D

router.delete('/contacts/:id', authorize, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: 'Not Valid ID' });
  if (!id) return res.status(400).json({ error: 'Id not found' });
  try {
    const contact = await Contact.findOne({ _id: id });
    if (!contact)
      return res.status(400).json({ error: 'No such contact found' });

    if (req.user._id.toString() !== contact.postedBy._id.toString())
      return res.status(401).json({ error: 'Not authorized to delete' });

    const result = await Contact.deleteOne({ _id: id });
    return res.status(200).json({ ...contact._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
