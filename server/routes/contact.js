const router = require('express').Router();
const { restart } = require('nodemon');
const authorize = require('../middlewares/authorize');
const { validateContact, Contact } = require('../models/Contact');
const mongoose = require('mongoose');
//C
//Create contact
router.post('/contacts', authorize, async (req, res) => {
  //validate all the fields
  const { error } = validateContact(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, address, email, phone, isfavourite } = req.body;

  console.log('thisss', req);

  try {
    //check if the contact already exists
    const doesContactAlreadyExist = await Contact.findOne({ name });
    if (doesContactAlreadyExist) {
      return res
        .status(400)
        .json({ error: 'Contact Already Exists, Go to Edit' });
    }
    //create the contact
    const newContact = new Contact({
      name,
      address,
      email,
      phone,
      isfavourite,
      postedBy: req.user._id,
    });
    const result = await newContact.save();

    return res.status(201).json(result._doc);
  } catch (err) {
    console.log(err);
  }
});
//R
//List all the contacts
router.get('/contacts', authorize, async (req, res) => {
  try {
    const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
      'postedBy',
      '-password'
    );
    return res.status(200).json({ contacts: myContacts.reverse() });
  } catch (err) {
    console.log(error);
  }
});
//U
//Edit the contact
router.put('/contacts/:id', authorize, async (req, res) => {
  const { id } = req.params;
  //check if the id is valid or not- not that important
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: 'Not Valid ID' });
  //check id exisits or not
  if (!id) return res.status(400).json({ error: 'Id not found' });
  try {
    //check if there is a contact associated to the given id
    const contact = await Contact.findOne({ _id: id });
    if (!contact)
      return res.status(400).json({ error: 'No such contact found' });
    // check if authorized to edit
    if (req.user._id.toString() !== contact.postedBy._id.toString())
      return res.status(401).json({ error: 'Not authorized to Edit' });
    //Edit the Contact
    // const { error } = validateContact(req.body);
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message });
    // }
    const updatedData = { ...req.body, id: undefined };
    const result = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//D
router.delete('/contacts/:id', authorize, async (req, res) => {
  const { id } = req.params;

  //check if the id is valid or not- not that important
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: 'Not Valid ID' });
  //check id exisits or not
  if (!id) return res.status(400).json({ error: 'Id not found' });

  try {
    //check if there is a contact associated to the given id
    const contact = await Contact.findOne({ _id: id });
    if (!contact)
      return res.status(400).json({ error: 'No such contact found' });
    // check if authorized to delete
    if (req.user._id.toString() !== contact.postedBy._id.toString())
      return res.status(401).json({ error: 'Not authorized to delete' });
    //delete the id

    const result = await Contact.deleteOne({ _id: id });
    return res.status(200).json({ ...contact._doc });
  } catch (err) {
    console.log(err);
  }
});
// to get a single id
router.get('/contacts/:id', authorize, async (req, res) => {
  const { id } = req.params;

  //check if the id is valid or not- not that important
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: 'Not Valid ID' });
  //check id exisits or not
  if (!id) return res.status(400).json({ error: 'Id not found' });

  try {
    const contact = await Contact.findOne({ _id: id });

    return res.status(200).json({ ...contact._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
