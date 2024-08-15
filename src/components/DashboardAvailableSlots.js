import React from 'react';

const DashboardAvailableSlots = ({ slots, handleSlotSelection }) => {
    return (
        <div className="dashboard-available-slots">
            <h2>Available Slots</h2>
            <ul>
                {slots.map((slot, index) => (
                    <li key={index} onClick={() => handleSlotSelection(slot)}>
                        {slot}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardAvailableSlots;
