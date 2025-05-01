const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: String,
  location: String
});

module.exports = mongoose.model('Department', departmentSchema);
