import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const CustomerDashboard = () => {
  const [ticketTitle, setTicketTitle] = useState(""); // State for ticket title
  const [ticketDescription, setTicketDescription] = useState(""); // State for ticket description
  const [message, setMessage] = useState(""); // State for feedback messages
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission loading

  const navigate = useNavigate(); // Initialize navigate function

  // Handle ticket submission
  const handleSubmit = async () => {
    if (!ticketTitle.trim() || !ticketDescription.trim()) {
      setMessage("Error: Both title and description are required.");
      return;
    }

    const customerName = localStorage.getItem("username"); // Retrieve customerName from localStorage
    if (!customerName) {
      setMessage("Error: Customer name is missing. Please log in again.");
      return;
    }

    setIsSubmitting(true); // Show loading during submission
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.post(
        "http://localhost:5000/api/tickets/create", // Backend endpoint for ticket creation
        { title: ticketTitle, description: ticketDescription, customerName }, // Include customerName in the payload
        {
          headers: { Authorization: `Bearer ${token}` }, // Attach authorization header
        }
      );
      setMessage(`Ticket submitted successfully! Ticket ID: ${response.data.id}`); // Display success message
      setTicketTitle(""); // Clear title field
      setTicketDescription(""); // Clear description field
    } catch (err) {
      setMessage("Error submitting ticket: " + (err.response?.data?.message || err.message)); // Display error message
    } finally {
      setIsSubmitting(false); // End loading
    }
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Customer Dashboard</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {/* Ticket Title Input */}
        <input
          type="text"
          className="w-full p-3 border rounded mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Ticket Title"
          value={ticketTitle}
          onChange={(e) => setTicketTitle(e.target.value)} // Update title state
        />
        {/* Ticket Description Input */}
        <textarea
          className="w-full p-3 border rounded mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Describe your issue..."
          value={ticketDescription}
          onChange={(e) => setTicketDescription(e.target.value)} // Update description state
        />
        {/* Submit Button */}
        <button
          className={`w-full px-4 py-2 rounded text-white shadow-md ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={handleSubmit} // Handle form submission
          disabled={isSubmitting} // Disable button when submitting
        >
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </button>

        {/* Navigate to Ticket List */}
        <button
          className="mt-4 w-full px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 shadow-md"
          onClick={() => navigate("/tickets")} // Redirect to ticket list
        >
          View My Tickets
        </button>

        {/* Feedback Message */}
        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;