const mongoose = require("mongoose");


const salesSchema = new mongoose.Schema(
    
    {
    medicines: [{
      medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicalStock',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }],
    buyerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  }
  
  );
  module.exports = mongoose.model("sales", salesSchema);