const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "ThisisCloudPad";
//adding validation
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
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({authtoken})
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some unknown error occured");
  }

})
module.exports = router