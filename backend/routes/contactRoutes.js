const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// TEST ROUTE (sanity check)
router.get("/test", (req, res) => {
  res.send("Contact route working");
});

// CREATE a contact (POST)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // basic validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE a contact by id
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contact.deleteOne();

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
