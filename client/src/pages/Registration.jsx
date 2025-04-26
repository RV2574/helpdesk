import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Customer", // Default role is "Customer"
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500); // Redirect to login after 1.5 seconds
      setFormData({ username: "", password: "", role: "Customer" }); // Reset form fields
    } catch (err) {
      console.error("Error during registration:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error during registration.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Register</h1>
      {message && (
        <p className={`mt-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleRegister} className="mt-4">
        <div className="mb-4">
          <label className="block font-medium">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="border p-2 w-full"
          >
            <option value="Customer">Customer</option>
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;