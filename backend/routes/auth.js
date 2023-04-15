const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult } = require('express-validator');

router.post('/', [
    body('name', 'Enter a valid name').isLength({min :3}),
    body('email', 'Enter valid email').isLength({min :3}),
    body('password', 'Password should be greater than 5 charecters').isLength({min :5})
] , (req, res)=>{ 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err=> {console.log(err)
    res.json({error: 'Please enter a unique value for email', message: err.message})})
 
} )
module.exports = router