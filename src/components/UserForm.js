import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ fetchUsers, editingUser, setEditingUser }) => {
  // Declare all required states
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [memberShip, setMemberShip] = useState("");

  // Prefill form when editing
  useEffect(() => {
    if (editingUser) {
      setUserId(editingUser.userId);
      setFullName(editingUser.fullName);
      setEmail(editingUser.email);
      setPassword(editingUser.password);
      setPhoneNumber(editingUser.phoneNumber || "");
      setAddress(editingUser.address || "");
      setMemberShip(editingUser.memberShip || "");
    } else {
      setUserId("");
      setFullName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setAddress("");
      setMemberShip("");
    }
  }, [editingUser]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userId,
      fullName,
      email,
      password,
      phoneNumber,
      address,
      memberShip,
    };

    try {
      if (editingUser) {
        await fetch(`http://localhost:8080/users/Update/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      } else {
        await fetch("http://localhost:8080/users/Create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }

      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Membership"
        value={memberShip}
        onChange={(e) => setMemberShip(e.target.value)}
      />

      <button type="submit">{editingUser ? "Update" : "Submit"}</button>
    </form>
  );
};

export default UserForm;
