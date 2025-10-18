import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ fetchUsers, editingUser, setEditingUser }) => {
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [memberShip, setMemberShip] = useState('');

  useEffect(() => {
    if (editingUser) {
      setUserId(editingUser.userId);
      setFullName(editingUser.fullName);
      setEmail(editingUser.email);
      setPassword(editingUser.password);
      setPhoneNumber(editingUser.phoneNumber);
      setAddress(editingUser.address);
      setMemberShip(editingUser.memberShip);
    } else {
      setUserId('');
      setFullName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setAddress('');
      setMemberShip('');
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { userId, fullName, email, password, phoneNumber, address, memberShip };

    try {
      if (editingUser) {
        await fetch(`http://localhost:8080/users/Update/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      } else {
        await fetch('http://localhost:8080/users/Create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      }

      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          required
          disabled={!!editingUser}
        />
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          type="text"
          value={memberShip}
          onChange={(e) => setMemberShip(e.target.value)}
          placeholder="Membership"
        />
        <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
