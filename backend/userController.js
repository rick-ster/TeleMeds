const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; 

const registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
        await db.query(query, [email, username, hashedPassword]);

        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Email or password not provided');
        return res.status(400).json({ message: 'All fields are required' });
    }

    console.log(`Attempting to login with email: ${email}`);

    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.query(query, [email]);

        if (results.length === 0) {
            console.log('No user found with this email');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        console.log('User found:', user);

        const match = await bcrypt.compare(password, user.password);
        console.log(`Password comparison result: ${match}`);

        if (!match) {
            console.log('Passwords do not match');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log('Passwords match, generating token');
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token);

        // Include userId in the response
        res.json({ message: 'Login successful', token, userId: user.id });
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// userController.js
const getUserProfile = async (req, res) => {
    const userId = req.params.id;

    try {
        const query = 'SELECT id, email, username FROM users WHERE id = ?';
        const [results] = await db.query(query, [userId]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };






