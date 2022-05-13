const express = require('express');
const router = express.Router();
// const validateToken = require('../middleware/validateToken');
const { check, validationResult } = require('express-validator');

const Inventory = require('../models/Inventory');
const { default: mongoose } = require('mongoose');

// @route       GET /inventory/
// @desc        Get all inventories
// @access      Private
router.get('/', async (req, res) => {
  try {
    const inventories = await Inventory.find({});
    res.json(inventories);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error.');
  }
});

// @route       POST /inventory/
// @desc        Add an inventory
// @access      Private
router.post(
  '/',
  [
    [
      check('warehouse', 'Warehouse location is required.').not().isEmpty(),
      check('name', 'Inventory item name is required.').not().isEmpty(),
      check('quantity', 'Inventory quantity is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { warehouse, name, quantity } = req.body;
    try {
      const newInventory = new Inventory({
        warehouse: mongoose.Types.ObjectId(warehouse),
        name,
        quantity,
      });
      Inventory.create(newInventory);

      return res.json(newInventory);
    } catch (error) {
      console.log(error.message);
      console.log(warehouse, name, quantity);
      res.status(500).json({ error: error.message });
    }
  }
);

// @route       PUT /inventory/:id
// @desc        Edit an inventory with id
// @access      Private
router.put('/:id', async (req, res) => {
  const { warehouse, name, quantity } = req.body;
  const InventoryFields = {};
  if (warehouse) InventoryFields.warehouse = warehouse;
  if (name) InventoryFields.name = name;
  if (quantity) InventoryFields.quantity = quantity;

  try {
    let inventory = await Inventory.findById(req.params.id);

    if (!inventory)
      return res.status(404).json({ msg: 'Inventory not found.' });

    inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        $set: InventoryFields,
      },
      { new: true }
    );

    return res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route       DELETE /inventory/:id
// @desc        Delete an inventory item
// @access      Private
router.delete('/:id', async (req, res) => {
  try {
    let inventory = await Inventory.findById(req.params.id);

    if (!inventory)
      return res.status(404).json({ msg: 'Inventory not found.' });

    await Inventory.findByIdAndRemove(req.params.id);

    return res.json({ msg: 'Inventory deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
