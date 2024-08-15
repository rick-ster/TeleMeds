import React from 'react';
import axios from 'axios';
import '../CSS/UserTable.css';

const UserTable = ({ users, onDelete, onEdit }) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            onDelete(id);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>
                            <button 
                                className="user-table-button user-table-edit-button" 
                                onClick={() => onEdit(user.id)}>
                                Edit
                            </button>
                            <button 
                                className="user-table-button user-table-delete-button" 
                                onClick={() => handleDelete(user.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
