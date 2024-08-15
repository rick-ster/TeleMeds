import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';

const ManageStaff = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleEdit = (id) => {
        console.log('Edit user with ID:', id);
        // Implement navigation or modal for editing
    };

    return (
        <>
            
            <UserTable users={users} onDelete={handleDelete} onEdit={handleEdit} />
        </>
    );
};

export default ManageStaff;
