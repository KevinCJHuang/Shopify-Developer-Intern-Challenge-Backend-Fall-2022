const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'warehouse',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('inventory', InventorySchema);
