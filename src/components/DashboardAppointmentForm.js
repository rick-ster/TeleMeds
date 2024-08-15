import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const DashboardAppointmentForm = ({ formData, setFormData }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    const confirmAppointment = async () => {
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/appointments', formData);
            setSubmissionMessage('Your appointment has been booked. We will notify you once it is confirmed with the doctor.');
        } catch (error) {
            setSubmissionMessage('There was an error booking your appointment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const cancelAppointment = () => {
        setModalOpen(false);
    };

    return (
        <form className='dashboard-appoint-container' onSubmit={handleSubmit}>
            <h2 className='form-head'>Book an Appointment</h2>
            <div className="form-group">
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='Name'
                    required
                />
            </div>

            <div className="form-group">
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder='Email'
                    required
                />
            </div>
            <div className="form-group half-width">
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder='Phone No.'
                    required
                />
            </div>
            <div className="form-group half-width">
                <input
                    type="tel"
                    value={formData.altPhone}
                    onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                    placeholder='Alternate Phone No.'
                />
            </div>

            <div className="form-group">
                <textarea
                    className='comments'
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder='Comment (optional)'
                />
            </div>
            <div className="form-group half-width">
                <label>Date:</label>
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />
            </div>
            <div className="form-group half-width">
                <label>Time:</label>
                <input
                    type='time'
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                />
            </div>

            <button className='sub' type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
            </button>

            <Modal
                open={modalOpen}
                onClose={cancelAppointment}
                aria-labelledby="confirmation-modal-title"
                aria-describedby="confirmation-modal-description"
            >
                <Box sx={modalStyle} className='app-modal-style'>
                    <Typography id="confirmation-modal-title" variant="h6" component="h2">
                        {submissionMessage ? 'Appointment Status' : 'Confirm Appointment'}
                    </Typography>
                    <Typography id="confirmation-modal-description" sx={{ mt: 2 }}>
                        {submissionMessage || 'Are you sure you want to book this appointment?'}
                    </Typography>
                    {!submissionMessage && (
                        <>
                            <Button onClick={confirmAppointment} variant="contained" color="primary" style={{marginRight:'10px'}}>
                                Confirm
                            </Button>
                            <Button onClick={cancelAppointment} variant="outlined" color="secondary">
                                Cancel
                            </Button>
                        </>
                    )}
                    {submissionMessage && (
                        <Button onClick={cancelAppointment} variant="contained" color="primary">
                            Close
                        </Button>
                    )}
                </Box>
            </Modal>
        </form>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default DashboardAppointmentForm;
