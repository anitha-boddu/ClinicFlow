// Script to check for doctors in the MongoDB ClinicFlow database
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  specialty: String,
  department: String,
  experienceYears: Number,
  address: String,
}, { strict: false });

const User = mongoose.model('User', userSchema, 'users');

async function checkDoctors() {
  await mongoose.connect(process.env.MONGO_URI);
  const doctors = await User.find({ role: 'doctor' });
  console.log(`Found ${doctors.length} doctors:`);
  doctors.forEach(doc => {
    console.log(`- ${doc.name} (${doc.email})`);
  });
  await mongoose.disconnect();
}

checkDoctors().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
