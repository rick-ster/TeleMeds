import React from 'react';
import '../CSS/DoctorCard.css';

const DoctorCard = ({ doctor }) => {

    const handleViewProfile = () => {
        // Open a new tab with the doctor's profile page
        window.open(`/doctor-profile/${doctor.id}`, '_blank');
    };

    return (
        <div className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.specialty}</p>
            <div className="doctor-rating">
                {'★'.repeat(Math.round(doctor.rating))}
            </div>
            <button className="view-profile-button" onClick={handleViewProfile}>View Profile</button>
        </div>
    );
};

export default DoctorCard;
