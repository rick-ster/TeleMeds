import React, { useState } from 'react';
import DashboardAppointmentForm from './DashboardAppointmentForm';
import '../CSS/DashboardAppointmentPage.css';

const DashboardAppointmentPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        altPhone: '',
        comment: '',
        date: '',
        time: '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="dashboard-appointment-page">
            
                <DashboardAppointmentForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                />
            
        </div>
    );
};

export default DashboardAppointmentPage;
