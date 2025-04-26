import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token

      try {
        const response = await axios.get("http://localhost:5000/api/tickets", {
          headers: { Authorization: `Bearer ${token}` }, // Attach Authorization header
        });
        setTickets(response.data);
      } catch (err) {
        console.error("Error fetching tickets:", err.response?.data || err.message);
        setMessage(err.response?.data?.message || "Error fetching tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets(); // Fetch tickets when the component mounts
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Tickets</h1>
      {message && <p className="text-red-500">{message}</p>}
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Customer</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.customerName}</td>
                <td>{new Date(ticket.lastUpdated).toLocaleString()}</td>
                <td>
                  <Link to={`/tickets/${ticket._id}`} className="text-blue-500 underline">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketList;