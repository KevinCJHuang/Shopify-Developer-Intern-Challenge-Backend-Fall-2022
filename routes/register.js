const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const genToken = require('./utils.js');

// @route       POST /register
// @desc        Register a user
// @access      Public
router.post(
  '/',
  [
    check('name', 'Please add your name.').not().isEmpty(),
    check('email', 'Please include a valid employee email.').isEmail(),
    check(
      'password',
      'Please use a password with 8 or more characters.'
    ).isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // Validate registration inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // Check if employee email is already registered in DB
      let newUser = await User.findOne({ email });
      if (newUser) {
        return res.status(400).json({ msg: 'Employee email already exists' });
      }

      // Encrypt the password and create user
      let encryptedPassword = await bcrypt.hash(password, 10);
      newUser = new User({
        name,
        email,
        password: encryptedPassword,
      });
      User.create(newUser);

      const token = genToken(newUser._id);
      return res.json({ token });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
