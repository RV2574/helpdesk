import React, { useEffect, useState } from "react";
import axios from "axios";

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]); // State to store assigned tickets
  const [message, setMessage] = useState(""); // State to display feedback messages

  // Fetch tickets assigned to the agent on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token
        const response = await axios.get("http://localhost:5000/api/tickets/assigned", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data); // Set fetched tickets to state
      } catch (err) {
        console.error("Error fetching tickets:", err.response?.data || err.message);
        setMessage("Error fetching tickets.");
      }
    };

    fetchTickets();
  }, []);

  // Update ticket status
  const handleUpdateStatus = async (ticketId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/tickets/${ticketId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Ticket status updated successfully.");
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status } : ticket
        )
      );
    } catch (err) {
      console.error("Error updating ticket status:", err.response?.data || err.message);
      setMessage("Error updating ticket status.");
    }
  };

  return (
    <div className="p-6 bg-green-100 h-screen">
      <h1 className="text-3xl font-bold text-green-800">Agent Dashboard</h1>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Assigned Tickets</h2>
        {tickets.length === 0 ? (
          <p>No tickets assigned to you.</p>
        ) : (
          <table className="w-full mt-4 bg-white border border-gray-300 rounded">
            <thead>
              <tr>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td className="border px-4 py-2">{ticket.description}</td>
                  <td className="border px-4 py-2">{ticket.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                      onClick={() => handleUpdateStatus(ticket._id, "In Progress")}
                    >
                      Mark as In Progress
                    </button>
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleUpdateStatus(ticket._id, "Resolved")}
                    >
                      Mark as Resolved
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;