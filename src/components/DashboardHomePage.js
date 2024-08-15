import React from 'react';
import '../CSS/DashboardHomePage.css';

const HomePage = ({ setActiveComponent }) => {
  return (
    <div className="homepage-container">
      <div className="content-section">
        <h1>TeleHealth Services for You</h1>
        <h2>Explore Medications Online</h2>
        <p>
          Your health journey starts here—book appointments and explore treatments effortlessly. 
        </p>
        <button 
          className="cta-button"
          onClick={() => setActiveComponent('doctors')}
        >
          See a doctor now
        </button>
      </div>
      <div className="image-section">
        <img src="/Assets/Images/home1.jpg" alt="Doctor" />
      </div>
    </div>
  );
};

export default HomePage;
