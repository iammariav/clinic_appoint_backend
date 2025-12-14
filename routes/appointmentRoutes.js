const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');

// CREATE
router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET ALL (populate patient & doctor)
router.get('/', async (req, res) => {
  const appointments = await Appointment.find()
    .populate('patientId')
    .populate('doctorId');
  res.json(appointments);
});

// GET BY ID
router.get('/:id', async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('patientId')
    .populate('doctorId');
  if (!appointment) return res.status(404).json({ message: 'Not found' });
  res.json(appointment);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(appointment);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Appointment deleted' });
});

module.exports = router;
