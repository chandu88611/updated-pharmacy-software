const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  Quantity: {
    type: String,
    required: true,
  },
Batch: {
    type:String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  Gst: {
    type: String,
    required: true,
  },
  mrppack: {
    type: String,
    required: true,
  },
  expDate: {
    type: String,
    required: true,
  },
  freeQuantity: {
    type: String,
    required: true,
  }
},{
  timestamps:true
});

module.exports = mongoose.model("inventory", busSchema);