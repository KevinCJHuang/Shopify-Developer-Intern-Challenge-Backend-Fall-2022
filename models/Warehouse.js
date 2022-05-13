const mongoose = require('mongoose');

const WarehouseSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('warehouse', WarehouseSchema);
