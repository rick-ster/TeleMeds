import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/ProfilePage.css';
import DashboardAppointmentPage from '../components/DashboardAppointmentPage';
import DoctorPage from '../components/DashboardDoctorPage';
import HomePage from '../components/DashboardHomePage';
import MedicinePage from '../components/MedicinePage'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserMd,faUser, faCalendarAlt, faPills, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeComponent, setActiveComponent] = useState('home'); 

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/profile/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError(`Failed to fetch profile data: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [id]);

    const handleComponentChange = (component) => {
        setActiveComponent(component);
    };

    const handleLogout = () => {
        window.location.href = '/login';
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    let ComponentToRender;
    switch (activeComponent) {
        case 'home':
            ComponentToRender = <HomePage setActiveComponent={handleComponentChange} />;
            break;
        case 'doctors':
            ComponentToRender = <DoctorPage />;
            break;
        case 'appointments':
            ComponentToRender = <DashboardAppointmentPage />;
            break;
        case 'medicines':
            ComponentToRender = <MedicinePage />; 
            break;
        default:
            ComponentToRender = <HomePage setActiveComponent={handleComponentChange} />;
            break;
    }

    return (
        <div>
            <nav className="navbar">
            <div className="website-name">TeleMeds</div>
                <ul className="navbar-menu">
                    <li>
                        <button onClick={() => handleComponentChange('home')}>
                            <FontAwesomeIcon icon={faHome} /> Home
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleComponentChange('doctors')}>
                            <FontAwesomeIcon icon={faUserMd} /> Doctors
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleComponentChange('appointments')}>
                            <FontAwesomeIcon icon={faCalendarAlt} /> Appointments
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleComponentChange('medicines')}>
                            <FontAwesomeIcon icon={faPills} /> Medicines
                        </button>
                    </li>
                </ul>
                <div className="navbar-user-info">
                    <span><FontAwesomeIcon icon={faUser} /> {profileData?.username || 'N/A'}</span>
                    <button onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>
                </div>
            </nav>
            <main className='main_body'>
                {ComponentToRender}
            </main>
        </div>
    );
};

export default ProfilePage;
