import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // State to store all users
  const [message, setMessage] = useState(""); // Feedback message state
  const [loading, setLoading] = useState(false); // Loading state for better UX

  // Fetch all users when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        setMessage("Authorization token is missing! Please log in again.");
        return;
      }

      try {
        setLoading(true); // Show loading indicator
        const response = await axios.get("http://localhost:5000/api/admin/all", {
          headers: { Authorization: `Bearer ${token}` }, // Attach Authorization header
        });
        setUsers(response.data); // Save the users in the state
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
        setMessage(err.response?.data.message || "Error fetching users.");
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchUsers(); // Call the function on component load
  }, []);

   // Handle user deletion
   const handleDeleteUser = async (id) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
  
    // Check if token exists
    if (!token) {
      setMessage("Authorization token is missing! Please log in again.");
      return;
    }
  
    try {
      // Perform DELETE request
      const response = await axios.delete(`http://localhost:5000/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Attach Authorization header
      });
  
      // Check if the delete request was successful
      if (response.status === 200) {
        setMessage("User deleted successfully."); // Notify admin
        const updatedUsers = users.filter((user) => user._id !== id); // Remove deleted user from state
        setUsers(updatedUsers); // Update state
      } else {
        setMessage("Failed to delete the user."); // Notify if deletion failed
      }
    } catch (err) {
      // Handle errors during the DELETE operation
      console.error("Error deleting user:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error deleting user.");
    }
  };

  // Handle role update
  const handleRoleUpdate = async (id, newRole) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authorization token is missing! Please log in again.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/admin/${id}`, // Use correct backend route
        { role: newRole }, // Send the new role in the request body
        {
          headers: { Authorization: `Bearer ${token}` }, // Attach Authorization header
        }
      );
      setMessage("User role updated successfully!");
      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, role: newRole } : user // Update role locally
      );
      setUsers(updatedUsers); // Update the state with the new role
    } catch (err) {
      console.error("Error updating role:", err.response?.data || err.message);
      setMessage(err.response?.data.message || "Error updating role.");
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">All Users</h2>
        {message && <p className="mt-4 text-red-600">{message}</p>}
        {loading ? (
          <p>Loading users...</p> // Show loading text while fetching users
        ) : (
          <table className="w-full mt-4 bg-white border border-gray-300 rounded">
            <thead>
              <tr>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                      className="p-1 border border-gray-300 rounded"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Customer">Customer</option>
                      <option value="Agent">Agent</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
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

export default AdminDashboard;