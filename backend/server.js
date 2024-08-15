const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

// Controllers
const { registerUser, loginUser, getUserProfile } = require('./userController');
const { getDoctorDetails } = require('./DoctorController');
const { createAppointment } = require('./appointmentController');
const { getMedicines } = require('./medicineController'); // Ensure correct import

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// User endpoints
app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/profile/:id', getUserProfile);

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Database error' });
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, username } = req.body;
    try {
        await db.query('UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]);
        res.status(200).json({ message: 'User updated' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Database error' });
    }
});

// User management endpoints
app.get('/users', async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, email, username FROM users');
        res.json(results);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Database error' });
    }
});

// Doctor endpoints
app.get('/api/doctors', async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, name, specialty, rating, image FROM doctorList');
        res.json(results);
    } catch (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).json({ message: 'Database error' });
    }
});

app.get('/api/doctors/:id', getDoctorDetails);

// Appointment endpoint
app.post('/api/appointments', createAppointment);

// Medicine endpoints
app.get('/api/medicines', getMedicines);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
