// routes/recordRoutes.js
const express = require("express");
const Record = require("../models/Record");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// ---------- MULTER SETUP ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // store in /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage });

/**
 * @route   POST /api/records
 * @desc    Create new record
 * @access  Private
 */
router.post("/", auth, upload.single("photo"), async (req, res) => {
  try {
    const { title, description, date, isPublic } = req.body;

    const record = new Record({
      title,
      description,
      date,
      isPublic: isPublic || false,
      user: req.user.id,
      photoUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await record.save();
    res.status(201).json(record);
  } catch (err) {
    console.error("Create record error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/records
 * @desc    Get all records for logged-in user
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const records = await Record.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error("Fetch records error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/records/public
 * @desc    Get all public records
 * @access  Public
 */
router.get("/public", async (req, res) => {
  try {
    const records = await Record.find({ isPublic: true }).populate("user", "name email");
    res.json(records);
  } catch (err) {
    console.error("Fetch public records error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/records/:id
 * @desc    Get single record (only owner or if public)
 * @access  Private/Public
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    if (!record.isPublic && record.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(record);
  } catch (err) {
    console.error("Fetch record error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/records/:id
 * @desc    Update a record
 * @access  Private (owner only)
 */
router.put("/:id", auth, upload.single("photo"), async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    if (record.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, date, isPublic } = req.body;

    record.title = title || record.title;
    record.description = description || record.description;
    record.date = date || record.date;
    record.isPublic = isPublic !== undefined ? isPublic : record.isPublic;
    if (req.file) record.photoUrl = `/uploads/${req.file.filename}`;

    await record.save();
    res.json(record);
  } catch (err) {
    console.error("Update record error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   DELETE /api/records/:id
 * @desc    Delete a record
 * @access  Private (owner only)
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    if (record.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await record.deleteOne();
    res.json({ message: "Record deleted" });
  } catch (err) {
    console.error("Delete record error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
