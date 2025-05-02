// wipeDepts.js
const axios = require('axios');
const API = 'http://localhost:3000/api/departments';

(async function() {
  try {
    // 1. fetch all
    const { data: depts } = await axios.get(API);
    // 2. send DELETE for each
    await Promise.all(
      depts.map(d => axios.delete(`${API}/${d._id}`))
    );
    console.log(`✅ Deleted ${depts.length} departments`);
  } catch (err) {
    console.error('❌ Error wiping departments:', err.message);
  }
})();
