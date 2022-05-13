const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const { check, validationResult } = require('express-validator');

const Warehouse = require('../models/Warehouse');

// @route       GET /warehouse
// @desc        Get all warehouses
// @access      Private
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
// @access      Private
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

// // @route       PUT /warehouse/:id
// // @desc        Edit a warehouse with id
// // @access      Private
// router.put('/:id', async (req, res) => {
//   const { name, city } = req.body;
//   const WarehouseFields = {};
//   if (name) WarehouseFields.name = name;
//   if (city) WarehouseFields.city = city;

//   try {
//     let warehouse = await Warehouse.findById(req.params.id);

//     if (!warehouse)
//       return res.status(404).json({ msg: 'Warehouse not found.' });

//     warehouse = await Warehouse.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: WarehouseFields,
//       },
//       { new: true }
//     );

//     return res.json(warehouse);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // @route       DELETE /warehouse/:id
// // @desc        Delete a warehouse
// // @access      Private
// router.delete('/:id', async (req, res) => {
//   try {
//     let warehouse = await Warehouse.findById(req.params.id);

//     if (!warehouse)
//       return res.status(404).json({ msg: 'Warehouse not found.' });

//     await Warehouse.findByIdAndRemove(req.params.id);

//     return res.json({ msg: 'Warehouse deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
