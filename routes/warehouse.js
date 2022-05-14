const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Warehouse = require('../models/Warehouse');

// @route       GET /warehouse
// @desc        Get all warehouses
// @access      Public
router.get('/', async (req, res) => {
  try {
    const warehouse = await Warehouse.find({});
    res.json(warehouse);
  } catch (error) {
    res.status(500).send('Server error.');
  }
});

// @route       POST /warehouse
// @desc        Add a warehouse
// @access      Public
router.post(
  '/',
  [
    [
      check('name', 'Warehouse name is required.').not().isEmpty(),
      check('city', 'Warehouse city is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, city } = req.body;
    try {
      const newWarehouse = new Warehouse({
        name,
        city,
      });
      Warehouse.create(newWarehouse);

      return res.json(newWarehouse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
