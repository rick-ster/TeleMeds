import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard'; // Import the DoctorCard component
import '../CSS/DashboardDoctorPage.css';

const DoctorPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialtyFilter, setSpecialtyFilter] = useState('All');
    const [ratingFilter, setRatingFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    // Function to handle specialty filter change
    const handleSpecialtyChange = (event) => {
        setSpecialtyFilter(event.target.value);
    };

    // Function to handle rating filter change
    const handleRatingChange = (event) => {
        setRatingFilter(event.target.value);
    };

    // Function to handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter doctors based on selected filters and search query
    const filteredDoctors = doctors.filter(doctor => {
        const matchesSpecialty = specialtyFilter === 'All' || doctor.specialty === specialtyFilter;
        const matchesRating = ratingFilter === 'All' || doctor.rating >= parseFloat(ratingFilter);
        const matchesSearchQuery = doctor.name.toLowerCase().startsWith(searchQuery.toLowerCase());
        return matchesSpecialty && matchesRating && matchesSearchQuery;
    });

    return (
        <div className="doctor-page">
            <div className="filters">
                <input
                    type="text"
                    className="filter-input"
                    placeholder="Search by Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <select className="filter-input" onChange={handleSpecialtyChange} value={specialtyFilter}>
                    <option value="All">All Specialties</option>
                    <option value="Family Medicine">Family Medicine</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Surgeon">Surgeon</option>
                    <option value="Dentist">Dentist</option>
                    {/* Add more options as needed */}
                </select>
                <select className="filter-input" onChange={handleRatingChange} value={ratingFilter}>
                    <option value="All">All Ratings</option>
                    <option value="3">3 Stars & up</option>
                    <option value="4">4 Stars & up</option>
                    <option value="5">5 Stars</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <div className="doctor-cards">
                {filteredDoctors.map((doctor) => (
                    <DoctorCard doctor={doctor} key={doctor.id} />
                ))}
            </div>
        </div>
    );
};

export default DoctorPage;
