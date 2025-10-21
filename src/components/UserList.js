import React from 'react';
import './UserList.css';

const UserList = ({ users, fetchUsers, setEditingUser }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/users/Delete/${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-list-container">
      {users.length === 0 ? (
        <p className="no-data">No users available.</p>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.userId} className="user-card">
              <div className="user-details">
                <h3>{user.fullName}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phoneNumber}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Membership:</strong> {user.memberShip}</p>
              </div>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => setEditingUser(user)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(user.userId)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
