import React, { useState } from "react";
import axios from "axios";

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    customerName: "", // Add customerName field
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    try {
      const response = await axios.post("http://localhost:5000/api/tickets/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the Authorization header
        },
      });
      setMessage("Ticket created successfully!");
      setFormData({ title: "", description: "", customerName: "" }); // Reset form fields
    } catch (err) {
      console.error("Error creating ticket:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Failed to create ticket.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Create Ticket</h1>
      {message && (
        <p className={`mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 w-full"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;