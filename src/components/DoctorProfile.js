import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/DoctorProfile.css'; 

const DoctorProfile = () => {
    const { id } = useParams(); 
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
                setDoctor(response.data);
            } catch (error) {
                setError('Error fetching doctor details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [id]);

    if (loading) {
        return <div className="loading-spinner">Loading...</div>; // Add spinner class in your CSS
    }

    if (error) {
        return <div className="error-message">{error}</div>; // Add error message class in your CSS
    }

    if (!doctor) {
        return <div className="no-doctor">No doctor found</div>;
    }

    return (
        <div className="doctor-profile">
            <div className="profile-header">
                <h2>{doctor.name}</h2>
                <p>{doctor.specialty} at {doctor.hospital}</p>
            </div>
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <div className="profile-details">
                <p><strong>Description:</strong> {doctor.description || 'N/A'}</p>
                <p><strong>Qualifications:</strong> {doctor.qualifications || 'N/A'}</p>
                <p><strong>Experience:</strong> {doctor.experience || 'N/A'} years</p>
                <p><strong>Languages:</strong> {doctor.languages || 'N/A'}</p>
            </div>
            <div className="specialty-section">
                <h3>Specialties</h3>
                <p>{doctor.specialties || 'N/A'}</p>
            </div>
            <div className="contact-info">
                <h3>Contact Information</h3>
                <p><strong>Contact Number:</strong> {doctor.contact_number || 'N/A'}</p>
                <p><strong>Email:</strong> {doctor.email || 'N/A'}</p>
                <p><strong>Address:</strong> {doctor.address || 'N/A'}</p>
            </div>
        </div>
    );
};

export default DoctorProfile;
