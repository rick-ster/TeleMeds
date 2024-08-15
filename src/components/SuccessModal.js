import React from 'react';
import '../CSS/SuccessModal.css';

const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Registration Successful!</h2>
                <p>Your credentials are registered. You can log in now.</p>
                <button className="modal-button" onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default SuccessModal;
