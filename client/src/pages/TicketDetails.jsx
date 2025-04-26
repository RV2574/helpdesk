import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketDetails = ({ match }) => {
  const { id } = match.params; // Get ticket ID from URL
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTicketDetails = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`http://localhost:5000/api/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTicket(response.data);
        setStatus(response.data.status);
      } catch (err) {
        console.error("Error fetching ticket details:", err.response?.data || err.message);
        setMessage(err.response?.data?.message || "Error fetching ticket details.");
      }
    };

    fetchTicketDetails(); // Fetch ticket details on component mount
  }, [id]);

  const handleUpdateTicket = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/tickets/${id}`,
        { status, note, author: "Admin" }, // Update status or add a note
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Ticket updated successfully!");
      setTicket(response.data);
      setNote(""); // Clear the note input
    } catch (err) {
      console.error("Error updating ticket:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error updating ticket.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Ticket Details</h1>
      {message && <p className="text-red-500">{message}</p>}
      {ticket ? (
        <div>
          <p><strong>Title:</strong> {ticket.title}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Customer:</strong> {ticket.customerName}</p>
          <p><strong>Last Updated:</strong> {new Date(ticket.lastUpdated).toLocaleString()}</p>
          <h2 className="text-xl font-bold mt-4">Notes</h2>
          <ul>
            {ticket.notes.map((note, index) => (
              <li key={index}>
                <p><strong>{note.author}:</strong> {note.content}</p>
                <p><small>{new Date(note.timestamp).toLocaleString()}</small></p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
            <label>Add Note:</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            <button onClick={handleUpdateTicket} className="bg-blue-500 text-white rounded px-4 py-2">
              Update Ticket
            </button>
          </div>
        </div>
      ) : (
        <p>Loading ticket details...</p>
      )}
    </div>
  );
};

export default TicketDetails;