const db = require('./db');

// Get details of a specific doctor
const getDoctorDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query(`
            SELECT d.id, d.name, d.specialty, d.rating, d.image, 
                   dt.description, dt.qualifications, dt.experience,
                   dt.contact_number, dt.email, dt.address,
                   dt.hospital, dt.languages, dt.specialties
            FROM doctorList d
            LEFT JOIN DoctorDetail dt ON d.id = dt.doctor_id
            WHERE d.id = ?
        `, [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports = {
    getDoctorDetails,
};
