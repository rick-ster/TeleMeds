import React, { useEffect, useState } from 'react';
import Card from './Card';

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/medicines');
        const data = await response.json();
        setMedicines(data);
      } catch (err) {
        console.error('Error fetching medicines:', err);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className='medicine_page' >
      {medicines.map((medicine, index) => (
        <Card 
          key={index} 
          image={medicine.image} 
          name={medicine.name} 
          description={medicine.description} 
        />
      ))}
    </div>
  );
};

export default MedicinePage;
