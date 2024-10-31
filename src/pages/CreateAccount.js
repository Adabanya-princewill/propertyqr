import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState(""); // Change from username to email
  const [brandName, setBrandName] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("developer"); // 'developer' or 'realtor'
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();

    // Retrieve existing users or initialize as empty array if none
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email already exists
    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      alert("Email already exists. Please choose a different one.");
      return;
    }

    // Create a new user object
    const newUser = { email, brandName, password, accountType };

    // Add the new user to the array of existing users
    const updatedUsers = [...existingUsers, newUser];

    // Save the updated array back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Navigate to login page after account creation
    navigate("/login");
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleCreateAccount}>
        <input
          type="email" // Change type to email for better validation
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
          <option value="developer">Developer</option>
          <option value="realtor">Realtor</option>
        </select>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
