import React, { useState, useEffect } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/users/Read");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="main-container">
      {/* Left: User Form */}
      <div className="glass-card form-section">
        <h2>User Management Login</h2>
        <UserForm
          fetchUsers={fetchUsers}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />
      </div>

      {/* Right: Scrollable User List */}
      <div className="glass-card list-section">
        <h2>User Records</h2>
        <div className="scroll-area">
          <UserList
            users={users}
            fetchUsers={fetchUsers}
            setEditingUser={setEditingUser}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
