const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');

// CREATE
router.post('/', async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET ALL
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(doctor);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: 'Doctor deleted' });
});

module.exports = router;
