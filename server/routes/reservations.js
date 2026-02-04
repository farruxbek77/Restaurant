const express = require('express');
const Reservation = require('../models/Reservation');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Create reservation
router.post('/', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all reservations (admin only)
router.get('/', auth, adminAuth, async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date: -1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update reservation status (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
