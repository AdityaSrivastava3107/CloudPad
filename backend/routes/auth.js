const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "ThisisCloudPad";
// user creation route
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter valid email').isLength({ min: 3 }),
  body('password', 'Password should be greater than 5 charecters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //checking for same email
  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ errors: "User with same email already exists" });
    }
    //Password hashing and salt
    const salt = await bcrypt.genSalt(10);
    const secretPass = await bcrypt.hash(req.body.password, salt);
    // new user
    user = await User.create({
      name: req.body.name,
      password: secretPass,
      email: req.body.email,
    })
    // authentication token
    const data = {
      user: {
        id: user._id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ authtoken })
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some unknown error occured");
  }

})
//user login route
router.post('/login', [
  body('email', 'Enter valid Email ID').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Extracting pass and id from req.body
  const { email, password } = req.body;
  // checking is the user is giving correct details for
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: "Login with correct credentials" });
    }
    const passCompare = (password) => {
      const match = bcrypt.compare(password, user.password);
      return match;
    }
    if (!passCompare(password)) {
      return res.status(400).json({ errors: "Login with correct credentials" });
    }
    const data = {
      user: {
        id: user._id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ authtoken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})
// user detail route
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router