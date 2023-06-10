const router = require("express").Router();
const Inventory = require("../models/Inventory.js");
// const authMiddleware = require("../middlewares/authMiddleware");

// add-Inventory

router.post("/add-Inventory",  async (req, res) => {
  try {
    const existingInventory = await Inventory.findOne({ medicineName:req.body.medicineName });
    if (existingInventory) {
      return res.status(200).send({
        success: false,
        message: "Inventory already exists",
      });
    }
    const newInventory = new Inventory(req.body);
    await newInventory.save();
    return res.status(200).send({
      success: true,
      message: "Inventory added successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// update-Inventory

router.post("/update-Inventory",  async (req, res) => {
  try {
    await Inventory.findByIdAndUpdate(req.body._id,req.body);
    
    return res.status(200).send({
      success: true,
      message: "Inventory updated successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message});
  }
});

// delete-Inventory

router.post("/delete-Inventory",  async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.body.id);
    return res.status(200).send({
      success: true,
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});



// get-all-Inventoryes

router.get("/get-all-Inventories",  async (req, res) => {
  try {
    const Inventoryes = await Inventory.find();
    return res.status(200).send({
      success:true,
      message:"Inventoryes fetched successfully",
      data:Inventoryes,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get-Inventory-by-id

router.post("/get-Inventory-by-id",  async (req, res) => {
  try {
    const Inventory = await Inventory.findById(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Inventory fetched successfully",
      data: Inventory,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;