const express = require('express');
const router = express.Router();
const Meeting = require('./models/Meeting');

// Create Meeting
router.post('/meetings', async (req, res) => {
    try {
        const meeting = new Meeting(req.body);
        await meeting.save();
        res.status(201).json(meeting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read Meetings
router.get('/meetings', async (req, res) => {
    try {
        const meetings = await Meeting.find();
        res.status(200).json(meetings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Meeting
router.put('/meetings/:id', async (req, res) => {
    try {
        const updated = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Meeting
router.delete('/meetings/:id', async (req, res) => {
    try {
        await Meeting.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

