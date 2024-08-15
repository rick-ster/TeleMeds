const db = require('./db');

const getMedicines = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM medicines');
        res.json(results);
    } catch (err) {
        console.error('Error fetching medicines:', err);
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports = { getMedicines };
