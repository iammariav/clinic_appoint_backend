const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

dotenv.config();
connectDB();

const app = express();

// ✅ REQUIRED MIDDLEWARE
app.use(cors());            // allow requests from frontend (5173)
app.use(express.json());    // parse JSON bodies

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Test route
app.get('/', (req, res) => res.send('Clinic API is running...'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
