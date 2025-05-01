const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  role: String
});

module.exports = mongoose.model('Assignment', assignmentSchema);
