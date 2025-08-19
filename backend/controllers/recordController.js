const Record = require('../models/Record');

// ✅ Get all records
exports.getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ message: "Server Error while fetching records" });
  }
};

// ✅ Create a new record (with optional image upload)
exports.createRecord = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    // if image uploaded via multer
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // you can serve this statically
    }

    const newRecord = new Record({
      title,
      description,
      date: date || new Date(), // default = today
      image: imageUrl,
    });

    const saved = await newRecord.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating record:", err);
    res.status(400).json({ message: err.message || "Failed to create record" });
  }
};
