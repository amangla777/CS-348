require('dotenv').config();
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({ name: String });
const Department = mongoose.model('Department', departmentSchema);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const newDept = new Department({ name: 'Test Department' });
    await newDept.save();

    console.log("✅ Department inserted successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Insertion failed:", err.message);
    process.exit(1);
  });
