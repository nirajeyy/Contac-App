const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  //For all the input
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Enter all the required Field' });
  //name validation
  if (name.length > 25) return res.status(400).json({ error: 'Long Name!' });

  //email validation with regex
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res.status(400).json({ error: 'Please enter a valid email' });

  //Password Validation
  if (password.length <= 6)
    return res
      .status(400)
      .json({ error: 'Password must be at least 6 characters Long' });

  //
  try {
    const doesUserAlreadyExist = await User.findOne({ email });

    if (doesUserAlreadyExist)
      return res.status(400).json({ error: 'User Already Exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    // save the user
    const result = await newUser.save();
    result._doc.password = undefined;
    return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //login info validation
  //Both field present or not
  if (!email || !password)
    return res.status(400).json({ error: 'Enter all Fields' });
  //Email validation
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res.status(400).json({ error: 'Invalid Credentials' });

  try {
    //Authenticate Email
    const isUserAuthenticated = await User.findOne({ email });

    if (!isUserAuthenticated)
      return res.status(400).json({ error: 'Invalid Credentials' });
    //Authenticate Password

    const isPasswordAuthenticated = await bcrypt.compare(
      password,
      isUserAuthenticated.password
    );

    if (!isPasswordAuthenticated)
      return res.status(400).json({ error: 'Invalid Credentials' });

    const payload = { _id: isUserAuthenticated._id };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
