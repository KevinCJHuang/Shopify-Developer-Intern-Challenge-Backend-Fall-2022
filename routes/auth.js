const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const genToken = require('./utils.js');
const validateToken = require('../middleware/validateToken');

// @route       GET /auth
// @desc        Get a logged in user
// @access      Private
router.get('/', validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// @route       POST /auth
// @desc        Login user & get token
// @access      Public
router.post(
  '/',
  [
    check('email', 'Please include a valid employee email.').isEmail(),
    check('password', 'Password is required.').exists(),
  ],
  async (req, res) => {
    // Validate registration inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials.' });
      }

      const token = genToken(user._id);
      return res.json({ token });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
