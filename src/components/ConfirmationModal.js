import React from 'react';
import '../CSS/ConfirmationModal.css';

const ConfirmationModal = ({ show, onConfirm, onCancel, appointmentSummary }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirm Appointment</h2>
                {appointmentSummary}
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
