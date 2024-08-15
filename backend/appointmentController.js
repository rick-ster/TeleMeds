const db = require('./db');

// Controller for adding an appointment
const createAppointment = async (req, res) => {
  const { name, email, phone, altPhone, comment, date, time } = req.body;
  try {
    // Check if required fields are provided
    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await db.query(
      'INSERT INTO appointments (name, email, phone, altPhone, comment, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, altPhone, comment, date, time,]
    );
    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (err) {
    console.error('Error creating appointment:', err); // Detailed logging
    res.status(500).json({ message: 'Database error' });
  }
};

module.exports = { createAppointment };
