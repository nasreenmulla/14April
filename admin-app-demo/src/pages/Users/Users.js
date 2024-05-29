import React, { useState, useEffect } from 'react';
import api from '../../api/index';
import './Users.css'; // Assuming the CSS file name is Users.css

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/getuser'); // Assuming your API endpoint is '/getuser'
                setUsers(response.data.data); // Assuming the user data is nested under the 'data' key
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
       <div className='Uwrapper'>
         <div className="user-table-container">
            <h2>User Information</h2>
            <div className="table-wrapper">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.company}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
       </div>
    );
};

export default UserTable;
