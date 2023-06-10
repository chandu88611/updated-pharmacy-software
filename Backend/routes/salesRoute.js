const express = require('express');
const router = express.Router();
const Sales = require('../models/sales.js');
const MedicalStock = require('../models/Inventory.js');

// GET all sales records
router.get('/', (req, res) => {
  Sales.find()
    .populate('medicines.medicine', 'medicineName')
    .exec((err, sales) => {
      if (err) {
        console.error('Error fetching sales records:', err);
        res.status(500).json({ error: 'An error occurred while fetching sales records.' });
      } else {
        res.status(200).json(sales);
      }
    });
});






router.post('/', async (req, res) => {
  const { medicines, buyerName, phoneNumber } = req.body;

  try {
    // Verify if the medicines exist in the MedicalStock collection and retrieve their details
    const medicinesData = await MedicalStock.find({ _id: { $in: medicines.map(medicine => medicine.medicine) } });

    // Check if all the provided medicines exist in the MedicalStock collection
    if (medicinesData.length !== medicines.length) {
      return res.status(400).json({ error: 'One or more medicines do not exist in the stock.' });
    }

    let totalAmount = 0;
    for (let i = 0; i < medicines.length; i++) {
      const { medicine, quantity, amount } = medicines[i];
      const medicineData = medicinesData.find(item => item._id.equals(medicine));

      // Check if the requested quantity is available in the stock
      if (medicineData.Quantity < quantity) { // Corrected property name to Quantity
        return res.status(400).json({ error: `Insufficient quantity of ${medicineData.medicineName} in stock.` });
      }

      totalAmount += amount;

      medicineData.Quantity -= quantity; // Corrected property name to Quantity
      await medicineData.save();
    }

    // Create the new sales record
    const newSale = new Sales({
      medicines,
      buyerName,
      phoneNumber,
      totalAmount,
    });

    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (err) {
    console.error('Error saving sales record:', err);
    res.status(500).json({ error: 'An error occurred while saving the sales record.' });
  }
});


module.exports = router;
