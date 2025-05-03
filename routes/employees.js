const express  = require('express');
const mongoose = require('mongoose');
const router   = express.Router();
const Employee = require('../models/Employee');

// CREATE
router.post('/', async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.status(201).json(emp);
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ error: err.message });
  }
});

// READ (with optional department filter)
router.get('/', async (req, res) => {
  try {
    console.log('*** HIT /api/employees GET ***', req.query);
    const filter = {};

    if (req.query.department_id) {
      // cast to ObjectId
      filter.department_id = new mongoose.Types.ObjectId(req.query.department_id);
      console.log('→ Filtering employees by:', filter.department_id);
    } else {
      console.log('→ Fetching all employees (no department filter)');
    }

    const employees = await Employee
      .find(filter)
      .populate('department_id');

    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(`Error updating employee ${req.params.id}:`, err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error(`Error deleting employee ${req.params.id}:`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;